<script>
    import { cart } from "#lib/stores/cart.js";
    import { enhance } from "$app/forms";
    let { form } = $props();

    let cartSubtotal = $derived(
        $cart.reduce((total, item) => total + item.product.price * item.qty, 0),
    );
</script>

<svelte:head>
    <title>Checkout — Graw Store</title>
</svelte:head>

<section class="container" style="padding: 60px 20px; max-width: 800px;">
    <h1>Checkout</h1>

    {#if $cart.length === 0}
        <p>Your bag is empty. <a href="/">Continue shopping</a>.</p>
    {:else}
        <div
            style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px;"
        >
            <div>
                <h3>Order Summary</h3>
                <div
                    style="background: #ffffff; padding: 20px; border-radius: 8px;
                >
                    {#each $cart as item}
                        <div
                            style="display: flex; justify-content: space-between; margin-bottom: 10px;"
                        >
                            <span>{item.qty}x {item.product.name}</span>
                            <span>{item.product.price * item.qty} DA</span>
                        </div>
                    {/each}
                    <hr
                        style="margin: 20px 0; border: 0; border-top: 1px solid #080808;"
                    />
                    <div
                        style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem;"
                    >
                        <span>Total</span>
                        <span>{cartSubtotal} DA</span>
                    </div>
                </div>
            </div>

            <div>
                <h3>Shipping Details</h3>
                {#if form?.error}
                    <div style="color: red; margin-bottom: 15px;">
                        {form.error}
                    </div>
                {/if}
                <form
                    method="POST"
                    use:enhance
                    style="display: flex; flex-direction: column; gap: 15px;"
                >
                    <input
                        type="hidden"
                        name="items"
                        value={JSON.stringify($cart)}
                    />
                    <input type="hidden" name="total" value={cartSubtotal} />

                    <div>
                        <label
                            for="name"
                            style="display: block; margin-bottom: 5px;"
                            >Full Name</label
                        >
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"
                        />
                    </div>
                    <div>
                        <label
                            for="email"
                            style="display: block; margin-bottom: 5px;"
                            >Email</label
                        >
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"
                        />
                    </div>
                    <div>
                        <label
                            for="phone"
                            style="display: block; margin-bottom: 5px;"
                            >Phone Number</label
                        >
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"
                        />
                    </div>
                    <div>
                        <label
                            for="address"
                            style="display: block; margin-bottom: 5px;"
                            >Shipping Address</label
                        >
                        <textarea
                            id="address"
                            name="address"
                            rows="3"
                            required
                            style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        class="gold-btn"
                        style="margin-top: 10px; width: 100%;"
                        >Place Order</button
                    >
                </form>
            </div>
        </div>
    {/if}
</section>
