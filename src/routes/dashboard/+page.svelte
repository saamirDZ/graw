<script>
    import { enhance } from "$app/forms";
    let { data, form } = $props();

    let activeTab = $state("dashboard");

    let totalProducts = $derived(data.products?.length || 0);
    let totalMen = $derived(
        data.products?.filter((p) => p.category === "men").length || 0,
    );
    let totalWomen = $derived(
        data.products?.filter((p) => p.category === "women").length || 0,
    );
    let totalOrders = $derived(data.orders?.length || 0);
    let totalRevenue = $derived(
        data.orders?.reduce((sum, o) => sum + parseFloat(o.total || 0), 0) || 0,
    );
</script>

<svelte:head>
    <title>Admin Dashboard — Graw Store</title>
</svelte:head>

{#if !data.authenticated}
    <div class="login-wrapper">
        <div class="login-box">
            <h2 style="color: black !important;">Admin Login</h2>
            {#if form?.error}
                <div class="error">{form.error}</div>
            {/if}
            <form method="POST" action="?/login" use:enhance>
                <input
                    type="password"
                    name="password"
                    placeholder="Admin Password"
                    required
                />
                <button type="submit" class="gold-btn">Login</button>
            </form>
        </div>
    </div>

    <style>
        .login-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80vh;
        }
        .login-box {
            background: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 100%;
            max-width: 400px;
        }
        .login-box h2 {
            margin-bottom: 20px;
        }
        .login-box input {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .login-box button {
            width: 100%;
        }
        .error {
            color: red;
            margin-bottom: 15px;
        }
    </style>
{:else}
    <div class="admin-shell">
        <aside class="admin-sidebar">
            <a class="admin-brand" href="/">
                <span>GRAW</span>
                <small>STORE</small>
            </a>
            <div class="admin-label">MANAGEMENT</div>
            <nav class="admin-nav">
                <a
                    href="#"
                    class:active={activeTab === "dashboard"}
                    onclick={(e) => {
                        e.preventDefault();
                        activeTab = "dashboard";
                    }}
                >
                    <span class="nav-icon">⌂</span> Dashboard
                </a>
                <a
                    href="#"
                    class:active={activeTab === "products"}
                    onclick={(e) => {
                        e.preventDefault();
                        activeTab = "products";
                    }}
                >
                    <span class="nav-icon">◫</span> Products
                </a>
                <a
                    href="#"
                    class:active={activeTab === "add-product"}
                    onclick={(e) => {
                        e.preventDefault();
                        activeTab = "add-product";
                    }}
                >
                    <span class="nav-icon">＋</span> Add Product
                </a>
                <a
                    href="#"
                    class:active={activeTab === "orders"}
                    onclick={(e) => {
                        e.preventDefault();
                        activeTab = "orders";
                    }}
                >
                    <span class="nav-icon">≡</span> Orders
                </a>
            </nav>
            <div class="admin-sidebar-bottom">
                <form method="POST" action="?/logout" use:enhance>
                    <button
                        type="submit"
                        style="background: none; border: none; color: inherit; cursor: pointer; text-decoration: underline;"
                        >Logout</button
                    >
                </form>
                <a href="/" class="store-link">← View Store</a>
            </div>
        </aside>

        <main class="admin-content">
            <header class="admin-topbar">
                <div>
                    <span class="admin-kicker">GRAW STORE / ADMIN</span>
                    <h1>Store Dashboard</h1>
                </div>
            </header>

            {#if activeTab === "dashboard"}
                <section class="admin-section">
                    <div class="admin-stats">
                        <div class="admin-stat">
                            <div class="stat-icon">◫</div>
                            <div>
                                <small>Total Products</small>
                                <strong>{totalProducts}</strong>
                            </div>
                        </div>
                        <div class="admin-stat">
                            <div class="stat-icon">♂</div>
                            <div>
                                <small>Men's Collection</small>
                                <strong>{totalMen}</strong>
                            </div>
                        </div>
                        <div class="admin-stat">
                            <div class="stat-icon">♀</div>
                            <div>
                                <small>Women's Collection</small>
                                <strong>{totalWomen}</strong>
                            </div>
                        </div>
                        <div class="admin-stat">
                            <div class="stat-icon">$</div>
                            <div>
                                <small>Total Revenue</small>
                                <strong>{totalRevenue} DA</strong>
                            </div>
                        </div>
                    </div>
                </section>
            {:else if activeTab === "products"}
                <section class="admin-section">
                    <div class="admin-header-flex">
                        <h2>Manage Products</h2>
                    </div>
                    <div class="table-wrapper">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each data.products as p}
                                    <tr>
                                        <td
                                            ><img
                                                src={p.img}
                                                alt={p.name}
                                                width="50"
                                                style="border-radius: 4px;"
                                            /></td
                                        >
                                        <td>{p.name}</td>
                                        <td style="text-transform: capitalize;"
                                            >{p.category}</td
                                        >
                                        <td>{p.price} DA</td>
                                        <td>
                                            <form
                                                method="POST"
                                                action="?/removeProduct"
                                                use:enhance
                                                onsubmit={(e) => {
                                                    if (
                                                        !confirm(
                                                            "Delete this product?",
                                                        )
                                                    )
                                                        e.preventDefault();
                                                }}
                                            >
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={p.id}
                                                />
                                                <button
                                                    type="submit"
                                                    style="color: red; background: none; border: none; cursor: pointer;"
                                                    >Delete</button
                                                >
                                            </form>
                                        </td>
                                    </tr>
                                {/each}
                                {#if totalProducts === 0}
                                    <tr>
                                        <td
                                            colspan="6"
                                            style="text-align: center;"
                                            >No products found.</td
                                        >
                                    </tr>
                                {/if}
                            </tbody>
                        </table>
                    </div>
                </section>
            {:else if activeTab === "add-product"}
                <section class="admin-section">
                    <h2>Add New Product</h2>
                    {#if form?.error}
                        <div class="error">{form.error}</div>
                    {/if}
                    {#if form?.success}
                        <div style="color: green; margin-bottom: 15px;">
                            Product added successfully!
                        </div>
                    {/if}
                    <div class="admin-form-container">
                        <form
                            method="POST"
                            action="?/addProduct"
                            enctype="multipart/form-data"
                            use:enhance
                            class="admin-form grid-form"
                        >
                            <div class="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Graw Store Apollo"
                                />
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <select name="category" required>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Price (DZD)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    placeholder="4999"
                                />
                            </div>
                            <div class="form-group">
                                <label>Water Resistance</label>
                                <input
                                    type="text"
                                    name="water"
                                    required
                                    placeholder="5 ATM"
                                />
                            </div>
                            <div class="form-group">
                                <label>Size</label>
                                <input
                                    type="text"
                                    name="size"
                                    required
                                    placeholder="42 mm"
                                />
                            </div>
                            <div
                                class="form-group"
                                style="grid-column: 1 / -1;"
                            >
                                <label>Image File (Cool Image Upload)</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    class="file-upload-input"
                                />
                            </div>

                            <div class="form-actions full-width">
                                <button type="submit" class="gold-btn"
                                    >Add Product</button
                                >
                            </div>
                        </form>
                    </div>
                </section>
            {:else if activeTab === "orders"}
                <section class="admin-section">
                    <h2>Orders</h2>
                    <div class="table-wrapper">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Address</th>
                                    <th>Phone number</th>
                                    <th>Email</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each data.orders as o}
                                    <tr>
                                        <td
                                            >{new Date(
                                                o.created_at,
                                            ).toLocaleString()}</td
                                        >
                                        <td>{o.name}</td>
                                        <td>{o.address}</td>
                                        <td>{o.phone}</td>
                                        <td>{o.email}</td>
                                        <td>
                                            {#each o.items as item}
                                                <div style="font-size: 0.9em;">
                                                    {item.qty}x {item.product
                                                        .name}
                                                </div>
                                            {/each}
                                        </td>
                                        <td>{o.total} DA</td>
                                    </tr>
                                {/each}
                                {#if totalOrders === 0}
                                    <tr>
                                        <td
                                            colspan="5"
                                            style="text-align: center;"
                                            >No orders found.</td
                                        >
                                    </tr>
                                {/if}
                            </tbody>
                        </table>
                    </div>
                </section>
            {/if}
        </main>
    </div>
{/if}
