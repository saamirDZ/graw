<script>
    import { onMount } from 'svelte';
    import { cart } from '#lib/stores/cart.js';
    
    onMount(() => {
        cart.set([]);
    });
</script>

<svelte:head>
    <title>Order Successful — Graw Store</title>
</svelte:head>

<section class="container" style="padding: 100px 20px; text-align: center;">
    <h1 style="font-size: 3rem; margin-bottom: 20px;">Thank You!</h1>
    <p style="font-size: 1.2rem; color: #555;">Your order has been successfully placed.</p>
    <br>
    <a href="/" class="gold-btn">Return to Home</a>
</section>
