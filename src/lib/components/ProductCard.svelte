<script>
    import { getContext } from "svelte";
    import { cart } from "#lib/stores/cart.js";

    let { product } = $props();

    const { openBag, showToast } = getContext("app");

    function addToBag() {
        cart.update((items) => {
            const existingItem = items.find((item) => item.id === product.id);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                items.push({ id: product.id, qty: 1, product });
            }
            return items;
        });
        openBag();
        showToast("Added to your bag");
    }

    function favorite(event) {
        event.preventDefault();
        showToast("Saved to wishlist");
    }
</script>

<article class="product-card reveal visible">
    <a href="/product/{product.id}" class="product-image">
        <button class="heart" onclick={favorite} aria-label="Favorite">♡</button
        >
        <img src={product.img} alt={product.name} loading="lazy" />
    </a>

    <div class="product-body">
        <a href="/product/{product.id}" class="product-name">
            {product.name}
        </a>
        <small>{product.category.toUpperCase()} · {product.size}</small>
        <strong>{product.price} DA</strong>
        <div class="rating">★★★★★ <em>(8)</em></div>
        <button class="add-btn" onclick={addToBag}> Add to Bag </button>
    </div>
</article>
