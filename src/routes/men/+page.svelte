<script>
    import ProductCard from '#lib/components/ProductCard.svelte';
    let { data } = $props();
    
    let sort = $state('default');
    let sortedProducts = $derived([...data.products].sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        return a.name.localeCompare(b.name);
    }));
</script>

<svelte:head>
    <title>Men's Watches — Graw Store</title>
</svelte:head>

<section class="catalog">
    <div class="container catalog-head">
        <div>
            <h1>Men's Watches</h1>
            <p>Engineered for excellence. Designed for life.</p>
        </div>

        <div class="controls">
            <div class="sort">
                <select bind:value={sort}>
                    <option value="default">Sort by: Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>
        </div>
    </div>

    <div class="container grid" id="productGrid">
        {#each sortedProducts as product (product.id)}
            <ProductCard {product} />
        {/each}
        {#if sortedProducts.length === 0}
            <p>No products found.</p>
        {/if}
    </div>
</section>
