<script>
    import { onMount } from 'svelte';
    
    let elements = [];
    
    onMount(() => {
        elements = Array.from(document.querySelectorAll('.reveal:not(.visible)'));
        if (!('IntersectionObserver' in window)) {
            elements.forEach(element => element.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.08 });

        elements.forEach(element => observer.observe(element));
    });
</script>

<svelte:head>
    <title>Graw Store — Timeless Elegance</title>
</svelte:head>

<section class="hero">
    <div class="container inner">
        <div class="eyebrow">Luxury Watches</div>
        <h1>More Than<br>Just a Watch</h1>
        <p>Graw Store combines luxury, precision and style to create watches that tell more than time — they tell your story.</p>
        <a href="#collections" class="gold-btn">Shop Now →</a>
    </div>
</section>

<section class="hero-stats">
    <div class="container stats">
        <div class="stat">
            <i>⌑</i>
            <div>
                <b>Free Worldwide Shipping</b>
                <span>On all orders over $100</span>
            </div>
        </div>
        <div class="stat">
            <i>♢</i>
            <div>
                <b>Secure Payments</b>
                <span>100% secure checkout</span>
            </div>
        </div>
        <div class="stat">
            <i>✓</i>
            <div>
                <b>2 Year Warranty</b>
                <span>Premium quality guarantee</span>
            </div>
        </div>
        <div class="stat">
            <i>⌘</i>
            <div>
                <b>24/7 Support</b>
                <span>We're here to help</span>
            </div>
        </div>
    </div>
</section>

<section id="collections" class="section">
    <div class="container">
        <div class="section-head">
            <h2>Our Collections</h2>
            <p>Discover our exclusive collections for men and women.</p>
        </div>

        <div class="collection-grid">
            <a href="/men" class="collection-card reveal">
                <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=88" alt="Men's Watches">
                <div class="collection-copy">
                    <h3>Men’s Watches</h3>
                    <p>Strength. Precision. Character.</p>
                    <span class="outline-btn">Explore Collection →</span>
                </div>
            </a>

            <a href="/women" class="collection-card reveal">
                <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=88" alt="Women's Watches">
                <div class="collection-copy">
                    <h3>Women’s Watches</h3>
                    <p>Elegance. Grace. You.</p>
                    <span class="outline-btn">Explore Collection →</span>
                </div>
            </a>
        </div>
    </div>
</section>

<section id="story" class="story">
    <div>
        <div class="eyebrow">The Graw Store Philosophy</div>
        <h2>Crafted for Those Who Value Time</h2>
        <p>At Graw Store, we believe a watch is more than an accessory — it's a statement, a legacy, a timeless expression in every detail.</p>
        <a href="/about" class="gold-btn">Discover Our Story →</a>
    </div>
</section>
