<script>
    import { getContext } from "svelte";
    import { cart } from "#lib/stores/cart.js";
    let { data } = $props();

    let product = $derived(data.product);
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
</script>

<svelte:head>
    <title>{product.name} — Graw Store</title>
</svelte:head>

<section class="detail-section container">
    <div class="detail-gallery reveal visible">
        <img src={product.img} alt={product.name} id="detailImage" />
    </div>

    <div class="detail-info reveal visible">
        <div class="meta">
            <div class="rating">★★★★★ <em>(8 reviews)</em></div>
        </div>

        <h1 id="detailName">{product.name}</h1>
        <div class="price" id="detailPrice">{product.price} DA</div>

        <p class="desc" id="detailDesc">
            A refined Graw Store timepiece balancing precision, presence and
            timeless elegance. Designed for everyday confidence and finished
            with premium materials.
        </p>

        <div class="specs" id="specs">
            <div>
                <span>Water Resistance</span>
                <b>{product.water}</b>
            </div>
            <div>
                <span>Case Size</span>
                <b>{product.size}</b>
            </div>
        </div>

        <button class="gold-btn full-width" onclick={addToBag}>
            Add to Bag
        </button>

        <ul class="features">
            <li>✓ Free shipping and returns</li>
            <li>✓ 2-Year international warranty</li>
            <li>✓ Secure payment processing</li>
        </ul>
    </div>
</section>
