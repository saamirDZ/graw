<script>
    import "../app.css";
    import { cart } from "#lib/stores/cart.js";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let isMobileNavOpen = $state(false);
    let isBagOpen = $state(false);
    let toastMessage = $state("");
    let toastTimer;

    let cartCount = $derived(
        $cart.reduce((total, item) => total + item.qty, 0),
    );
    let cartSubtotal = $derived(
        $cart.reduce((total, item) => total + item.product.price * item.qty, 0),
    );

    function toggleMobileNav() {
        isMobileNavOpen = !isMobileNavOpen;
    }

    function closeMobileNav() {
        isMobileNavOpen = false;
    }

    function openBag() {
        isBagOpen = true;
        if (typeof document !== "undefined") {
            document.body.classList.add("lock");
        }
    }

    export function closeBag() {
        isBagOpen = false;
        if (typeof document !== "undefined") {
            document.body.classList.remove("lock");
        }
    }

    function changeQuantity(id, amount) {
        cart.update((items) => {
            const index = items.findIndex((item) => item.id === id);
            if (index !== -1) {
                items[index].qty += amount;
                if (items[index].qty <= 0) {
                    items.splice(index, 1);
                }
            }
            return items;
        });
    }

    function removeFromBag(id) {
        cart.update((items) => items.filter((item) => item.id !== id));
        showToast("Removed from your bag");
    }

    export function showToast(message) {
        toastMessage = message;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastMessage = "";
        }, 2200);
    }

    // Make global functions available to other components
    import { setContext } from "svelte";
    setContext("app", {
        openBag,
        closeBag,
        showToast,
    });
</script>

<header class="topbar">
    <div class="container nav">
        <a href="/" class="logo">
            Graw Store
            <small>TIMELESS ELEGANCE</small>
        </a>
        <nav class="links">
            <a href="/" class:active={page.url.pathname === "/"}>Home</a>
            <a href="/men" class:active={page.url.pathname === "/men"}
                >Men's Watches</a
            >
            <a href="/women" class:active={page.url.pathname === "/women"}
                >Women's Watches</a
            >
            <a href="/#story">About</a>
            <a href="/#contact">Contact</a>
        </nav>
        <div class="actions">
            <button aria-label="Search" class="icon-btn">⌕</button>
            <a
                href="/dashboard"
                aria-label="Account"
                class="icon-btn"
                style="text-decoration:none">♙</a
            >
            <button aria-label="Bag" class="icon-btn" onclick={openBag}>
                ♧
                <span class="bag-count">{cartCount}</span>
            </button>
            <button class="icon-btn menu-btn" onclick={toggleMobileNav}
                >☰</button
            >
        </div>
    </div>
</header>

<main>
    <slot />
</main>

<footer id="contact" class="footer">
    <div class="container footer-grid">
        <div>
            <a href="/" class="logo">
                Graw Store
                <small>TIMELESS ELEGANCE</small>
            </a>
        </div>
        <div>
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/men">Men's Watches</a>
            <a href="/women">Women's Watches</a>
            <a href="/#story">About</a>
            <a href="/#contact">Contact</a>
        </div>
        <div>
            <h4>Customer Service</h4>
            <a href="#">Shipping</a>
            <a href="#">Returns & Exchanges</a>
            <a href="#">Warranty</a>
            <a href="#">FAQ</a>
        </div>
        <div>
            <h4>Follow Us</h4>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">X</a>
            <a href="#">YouTube</a>
        </div>
    </div>
    <div class="container copyright">
        <span>© 2026 Graw Store. All rights reserved.</span>
        <span>VISA　● Mastercard　PayPal</span>
    </div>
</footer>

{#if isBagOpen}
    <div
        class="bag-backdrop show"
        onclick={() => closeBag()}
        onkeydown={(e) => e.key === "Escape" && closeBag()}
        role="button"
        tabindex="0"
    ></div>
{/if}
<aside class="bag-drawer" class:open={isBagOpen}>
    <div class="bag-head">
        <h2>Your Bag</h2>
        <button class="bag-close" onclick={() => closeBag()}>×</button>
    </div>
    <div class="bag-items">
        {#if $cart.length === 0}
            <div class="empty-bag">
                <div class="empty-icon">◌</div>
                <h3>Your bag is empty</h3>
                <p>Add a watch you love and it will appear here.</p>
            </div>
        {:else}
            {#each $cart as item (item.id)}
                <div class="bag-row">
                    <img src={item.product.img} alt={item.product.name} />
                    <div class="bag-info">
                        <b>{item.product.name}</b>
                        <span>{item.product.price} DA</span>
                        <div class="qty">
                            <button onclick={() => changeQuantity(item.id, -1)}
                                >−</button
                            >
                            <span>{item.qty}</span>
                            <button onclick={() => changeQuantity(item.id, 1)}
                                >+</button
                            >
                            <button
                                class="remove"
                                onclick={() => removeFromBag(item.id)}>×</button
                            >
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
    <div class="bag-summary">
        <div class="sumline">
            <span>Subtotal</span>
            <b>{cartSubtotal} DA</b>
        </div>
        <div class="sumline">
            <span>Shipping</span>
            <b>Free</b>
        </div>
        <div class="sumline total">
            <span>Total</span>
            <b>{cartSubtotal} DA</b>
        </div>
        <button
            class="gold-btn checkout"
            onclick={() => {
                closeBag();
                goto("/checkout");
            }}>Checkout</button
        >
        <a
            href="#"
            class="continue"
            onclick={(e) => {
                e.preventDefault();
                closeBag();
            }}>Continue Shopping</a
        >
    </div>
</aside>

<div class="toast" class:show={toastMessage !== ""}>
    {toastMessage}
</div>
