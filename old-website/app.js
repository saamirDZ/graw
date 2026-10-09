/* =========================================================
   Graw Store STORE — JAVASCRIPT
   This file handles products, filters, product details and bag.
   Edit PRODUCTS below when you want to add/change watches.
   ========================================================= */

// ---------------------------------------------------------
// 1. PRODUCTS
// ---------------------------------------------------------
const DEFAULT_PRODUCTS = [
  {
    id: "zenith",
    name: "Graw Store Zenith",
    category: "men",
    price: 499,
    tag: "New",
    movement: "Automatic",
    caseMaterial: "Stainless Steel",
    strap: "Stainless Steel Bracelet",
    water: "10 ATM (100 meters)",
    size: "42 mm",
    crystal: "Sapphire Crystal",
    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "vanguard",
    name: "Graw Store Vanguard",
    category: "men",
    price: 399,
    tag: "Luxury",
    movement: "Automatic",
    caseMaterial: "Stainless Steel",
    strap: "Leather Strap",
    water: "10 ATM (100 meters)",
    size: "42 mm",
    crystal: "Sapphire Crystal",
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "titan",
    name: "Graw Store Titan",
    category: "men",
    price: 299,
    tag: "Classic",
    movement: "Quartz",
    caseMaterial: "Stainless Steel",
    strap: "Stainless Steel Bracelet",
    water: "5 ATM (50 meters)",
    size: "41 mm",
    crystal: "Mineral Crystal",
    img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "sport",
    name: "Graw Store Sport",
    category: "men",
    price: 349,
    tag: "Bestseller",
    movement: "Quartz",
    caseMaterial: "Stainless Steel",
    strap: "Rubber Strap",
    water: "10 ATM (100 meters)",
    size: "43 mm",
    crystal: "Mineral Crystal",
    img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "heritage",
    name: "Graw Store Heritage",
    category: "men",
    price: 599,
    tag: "New",
    movement: "Automatic",
    caseMaterial: "Stainless Steel",
    strap: "Leather Strap",
    water: "10 ATM (100 meters)",
    size: "42 mm",
    crystal: "Sapphire Crystal",
    img: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "eclipse",
    name: "Graw Store Eclipse",
    category: "men",
    price: 399,
    tag: "Classic",
    movement: "Quartz",
    caseMaterial: "Stainless Steel",
    strap: "Stainless Steel Bracelet",
    water: "10 ATM (100 meters)",
    size: "41 mm",
    crystal: "Sapphire Crystal",
    img: "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "belle",
    name: "Graw Store Belle",
    category: "women",
    price: 349,
    tag: "New",
    movement: "Quartz",
    caseMaterial: "Stainless Steel",
    strap: "Stainless Steel Bracelet",
    water: "5 ATM (50 meters)",
    size: "34 mm",
    crystal: "Mineral Crystal",
    img: "https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "luna",
    name: "Graw Store Luna",
    category: "women",
    price: 299,
    tag: "Bestseller",
    movement: "Quartz",
    caseMaterial: "Rose Gold Steel",
    strap: "Leather Strap",
    water: "5 ATM (50 meters)",
    size: "34 mm",
    crystal: "Mineral Crystal",
    img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "royale",
    name: "Graw Store Royale",
    category: "women",
    price: 499,
    tag: "Luxury",
    movement: "Automatic",
    caseMaterial: "Stainless Steel",
    strap: "Stainless Steel Bracelet",
    water: "10 ATM (100 meters)",
    size: "36 mm",
    crystal: "Sapphire Crystal",
    img: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "charm",
    name: "Graw Store Charm",
    category: "women",
    price: 279,
    tag: "New",
    movement: "Quartz",
    caseMaterial: "Gold Steel",
    strap: "Leather Strap",
    water: "5 ATM (50 meters)",
    size: "33 mm",
    crystal: "Sapphire Crystal",
    img: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "diamond",
    name: "Graw Store Diamond",
    category: "women",
    price: 599,
    tag: "Luxury",
    movement: "Automatic",
    caseMaterial: "Rose Gold Steel",
    strap: "Stainless Steel Bracelet",
    water: "10 ATM (100 meters)",
    size: "36 mm",
    crystal: "Sapphire Crystal",
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=88"
  },
  {
    id: "vogue",
    name: "Graw Store Vogue",
    category: "women",
    price: 329,
    tag: "Classic",
    movement: "Quartz",
    caseMaterial: "Stainless Steel",
    strap: "Mesh Strap",
    water: "5 ATM (50 meters)",
    size: "34 mm",
    crystal: "Mineral Crystal",
    img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=88"
  }
];

// ---------------------------------------------------------
// 2. SMALL HELPERS
// ---------------------------------------------------------
function money(value) {
  return "$" + Number(value).toLocaleString("en-US");
}

function getCart() {
  return JSON.parse(localStorage.getItem("graw-storeCart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("graw-storeCart", JSON.stringify(cart));
  updateCartCount();
}

function getProduct(id) {
  return PRODUCTS.find(product => product.id === id);
}

function getCartItems() {
  return getCart()
    .map(item => ({ ...item, product: getProduct(item.id) }))
    .filter(item => item.product);
}

// ---------------------------------------------------------
// 3. SHOPPING BAG
// ---------------------------------------------------------
function addToBag(id) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart(cart);
  renderBag();
  openBag();
  showToast("Added to your bag");
}

function changeQuantity(id, amount) {
  const cart = getCart();
  const item = cart.find(cartItem => cartItem.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    const index = cart.indexOf(item);
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderBag();
}

function removeFromBag(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderBag();
  showToast("Removed from your bag");
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.qty, 0);

  document.querySelectorAll("[data-bag-count]").forEach(element => {
    element.textContent = count;
  });
}

function renderBag() {
  const bagItems = document.querySelector("#bagItems");
  if (!bagItems) return;

  const items = getCartItems();
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.qty,
    0
  );

  if (items.length === 0) {
    bagItems.innerHTML = `
      <div class="empty-bag">
        <div class="empty-icon">◌</div>
        <h3>Your bag is empty</h3>
        <p>Add a watch you love and it will appear here.</p>
      </div>
    `;
  } else {
    bagItems.innerHTML = items.map(({ id, qty, product }) => `
      <div class="bag-row">
        <img src="${product.img}" alt="${product.name}">

        <div class="bag-info">
          <b>${product.name}</b>
          <span>${money(product.price)}</span>

          <div class="qty">
            <button data-action="minus" data-id="${id}">−</button>
            <span>${qty}</span>
            <button data-action="plus" data-id="${id}">+</button>
            <button class="remove" data-action="remove" data-id="${id}">×</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  const subtotalElement = document.querySelector("#bagSubtotal");
  const totalElement = document.querySelector("#bagTotal");

  if (subtotalElement) subtotalElement.textContent = money(subtotal);
  if (totalElement) totalElement.textContent = money(subtotal);

  updateCartCount();
}

function openBag() {
  document.querySelector("#bagDrawer")?.classList.add("open");
  document.querySelector("#bagBackdrop")?.classList.add("show");
  document.body.classList.add("lock");
  renderBag();
}

function closeBag() {
  document.querySelector("#bagDrawer")?.classList.remove("open");
  document.querySelector("#bagBackdrop")?.classList.remove("show");
  document.body.classList.remove("lock");
}

// ---------------------------------------------------------
// 4. PRODUCT CARDS + CATALOG FILTERS
// ---------------------------------------------------------
function productCard(product) {
  return `
    <article class="product-card reveal">
      <a class="product-image" href="product.html?id=${product.id}">
        <span class="tag">${product.tag}</span>
        <button class="heart" data-action="favorite" aria-label="Favorite">♡</button>
        <img src="${product.img}" alt="${product.name}" loading="lazy">
      </a>

      <div class="product-body">
        <a href="product.html?id=${product.id}" class="product-name">
          ${product.name}
        </a>
        <small>${product.movement} · ${product.strap}</small>
        <strong>${money(product.price)}</strong>
        <div class="rating">★★★★★ <em>(8)</em></div>
        <button class="add-btn" data-action="add" data-id="${product.id}">
          Add to Bag
        </button>
      </div>
    </article>
  `;
}

function setupCatalog(category) {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;

  let products = PRODUCTS.filter(product => product.category === category);

  function renderProducts() {
    grid.innerHTML = products.map(productCard).join("");
    revealOnScroll();
  }

  renderProducts();

  document.querySelectorAll("[data-filter-tag]").forEach(button => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll("[data-filter-tag]")
        .forEach(item => item.classList.remove("active"));

      button.classList.add("active");

      const filter = button.dataset.filterTag.toLowerCase();

      if (filter === "all") {
        products = PRODUCTS.filter(product => product.category === category);
      } else {
        products = PRODUCTS.filter(product => {
          if (product.category !== category) return false;

          return (
            product.tag.toLowerCase() === filter ||
            product.movement.toLowerCase() === filter ||
            product.strap.toLowerCase().includes(filter)
          );
        });
      }

      renderProducts();
    });
  });

  document.querySelector("#sortSelect")?.addEventListener("change", event => {
    const sort = event.target.value;

    products.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    renderProducts();
  });
}

// ---------------------------------------------------------
// 5. PRODUCT DETAILS PAGE
// ---------------------------------------------------------
function setupProductPage() {
  const id = new URLSearchParams(location.search).get("id") || "zenith";
  const product = getProduct(id) || PRODUCTS[0];

  document.title = `${product.name} — Graw Store`;

  const image = document.querySelector("#detailImage");
  const name = document.querySelector("#detailName");
  const price = document.querySelector("#detailPrice");
  const tag = document.querySelector("#detailTag");
  const description = document.querySelector("#detailDesc");
  const specs = document.querySelector("#specs");
  const addButton = document.querySelector("#detailAdd");

  if (image) {
    image.src = product.img;
    image.alt = product.name;
  }

  if (name) name.textContent = product.name;
  if (price) price.textContent = money(product.price);
  if (tag) tag.textContent = product.tag;

  if (description) {
    description.textContent =
      "A refined Graw Store timepiece balancing precision, presence and timeless elegance. Designed for everyday confidence and finished with premium materials.";
  }

  if (specs) {
    const specifications = {
      Movement: product.movement,
      "Case Material": product.caseMaterial,
      Strap: product.strap,
      "Water Resistance": product.water,
      "Case Size": product.size,
      Crystal: product.crystal
    };

    specs.innerHTML = Object.entries(specifications)
      .map(([label, value]) => `
        <div>
          <span>${label}</span>
          <b>${value}</b>
        </div>
      `)
      .join("");
  }

  if (addButton) {
    addButton.addEventListener("click", () => addToBag(product.id));
  }
}

// ---------------------------------------------------------
// 6. NAVIGATION + EVENTS
// ---------------------------------------------------------
function setupNavigation() {
  const menuButton = document.querySelector("#menuBtn");
  const mobileNav = document.querySelector("#mobileNav");

  menuButton?.addEventListener("click", () => {
    mobileNav?.classList.toggle("open");
  });

  document.querySelectorAll("[data-close-mobile]").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav?.classList.remove("open");
    });
  });

  document.querySelector("#bagOpen")?.addEventListener("click", openBag);
  document.querySelector("#bagClose")?.addEventListener("click", closeBag);
  document.querySelector("#bagBackdrop")?.addEventListener("click", closeBag);
}

function setupBagEvents() {
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;

    if (action === "add") addToBag(id);
    if (action === "plus") changeQuantity(id, 1);
    if (action === "minus") changeQuantity(id, -1);
    if (action === "remove") removeFromBag(id);

    if (action === "favorite") {
      event.preventDefault();
      showToast("Saved to wishlist");
    }
  });
}

// ---------------------------------------------------------
// 7. ANIMATIONS + NOTIFICATIONS
// ---------------------------------------------------------
function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.graw - storeToastTimer);

  window.graw - storeToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal:not(.visible)");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  elements.forEach(element => observer.observe(element));
}

// ---------------------------------------------------------
// 8. START THE WEBSITE
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupBagEvents();
  updateCartCount();
  renderBag();
  revealOnScroll();

  const page = document.body.dataset.page;

  if (page === "men") setupCatalog("men");
  if (page === "women") setupCatalog("women");
  if (page === "product") setupProductPage();
});
