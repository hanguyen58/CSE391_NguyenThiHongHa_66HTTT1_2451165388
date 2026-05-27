// ===== DỮ LIỆU SẢN PHẨM =====
const products = [
  { id: 1,  name: "iPhone 16 Pro",     price: 29990000, category: "phone",    image: "https://placehold.co/400x300/4f46e5/white?text=iPhone+16",  rating: 4.8, inStock: true  },
  { id: 2,  name: "Samsung Galaxy S25",price: 24990000, category: "phone",    image: "https://placehold.co/400x300/0891b2/white?text=Galaxy+S25", rating: 4.6, inStock: true  },
  { id: 3,  name: "Xiaomi 14T",        price: 12990000, category: "phone",    image: "https://placehold.co/400x300/dc2626/white?text=Xiaomi+14T", rating: 4.3, inStock: false },
  { id: 4,  name: "OPPO Reno 13",      price: 10990000, category: "phone",    image: "https://placehold.co/400x300/16a34a/white?text=OPPO+Reno",  rating: 4.1, inStock: true  },
  { id: 5,  name: "MacBook Air M4",    price: 32990000, category: "laptop",   image: "https://placehold.co/400x300/7c3aed/white?text=MacBook+M4", rating: 4.9, inStock: true  },
  { id: 6,  name: "Dell XPS 15",       price: 38990000, category: "laptop",   image: "https://placehold.co/400x300/b45309/white?text=Dell+XPS",   rating: 4.5, inStock: true  },
  { id: 7,  name: "Asus ROG Zephyrus", price: 45990000, category: "laptop",   image: "https://placehold.co/400x300/be185d/white?text=ROG",        rating: 4.7, inStock: false },
  { id: 8,  name: "Lenovo ThinkPad",   price: 22990000, category: "laptop",   image: "https://placehold.co/400x300/0f766e/white?text=ThinkPad",   rating: 4.4, inStock: true  },
  { id: 9,  name: "Sony WH-1000XM6",  price: 8990000,  category: "audio",    image: "https://placehold.co/400x300/1d4ed8/white?text=Sony+WH",    rating: 4.8, inStock: true  },
  { id: 10, name: "AirPods Pro 3",     price: 7490000,  category: "audio",    image: "https://placehold.co/400x300/374151/white?text=AirPods",    rating: 4.6, inStock: true  },
  { id: 11, name: "JBL Charge 6",      price: 2990000,  category: "audio",    image: "https://placehold.co/400x300/b91c1c/white?text=JBL",        rating: 4.2, inStock: true  },
  { id: 12, name: "iPad Pro M4",       price: 27990000, category: "tablet",   image: "https://placehold.co/400x300/065f46/white?text=iPad+Pro",   rating: 4.7, inStock: true  },
  { id: 13, name: "Samsung Tab S10",   price: 19990000, category: "tablet",   image: "https://placehold.co/400x300/92400e/white?text=Tab+S10",    rating: 4.5, inStock: false },
  { id: 14, name: "Xiaomi Pad 7",      price: 9990000,  category: "tablet",   image: "https://placehold.co/400x300/5b21b6/white?text=Pad+7",      rating: 4.3, inStock: true  },
];

// ===== STATE =====
let state = {
  search: "",
  category: "all",
  sort: "default",
  cart: 0,
};

// ===== KHỞI TẠO UI =====
function initUI() {
  const root = document.querySelector("#root");

  // Navbar
  const navbar = document.createElement("nav");
  navbar.className = "navbar";
  navbar.innerHTML = `
    <span class="navbar-brand">🛍️ TechShop</span>
    <div class="navbar-right">
      <div class="cart-icon">
        🛒<span class="cart-badge" id="cartBadge">0</span>
      </div>
      <button class="dark-toggle" id="darkToggle">🌙 Dark Mode</button>
    </div>
  `;
  root.appendChild(navbar);

  // Controls
  const controls = document.createElement("div");
  controls.className = "controls";
  controls.innerHTML = `
    <input class="search-input" id="searchInput" type="text" placeholder="🔍 Tìm sản phẩm...">
    <select class="sort-select" id="sortSelect">
      <option value="default">Sắp xếp mặc định</option>
      <option value="price-asc">Giá tăng dần</option>
      <option value="price-desc">Giá giảm dần</option>
      <option value="name-az">Tên A-Z</option>
      <option value="rating-desc">Đánh giá cao nhất</option>
    </select>
  `;
  root.appendChild(controls);

  // Category filters
  const catContainer = document.createElement("div");
  catContainer.className = "category-filters";
  const categories = ["all", "phone", "laptop", "audio", "tablet"];
  const catLabels  = { all: "Tất cả", phone: "Điện thoại", laptop: "Laptop", audio: "Âm thanh", tablet: "Máy tính bảng" };
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-btn" + (cat === "all" ? " active" : "");
    btn.textContent = catLabels[cat];
    btn.dataset.category = cat;
    catContainer.appendChild(btn);
  });
  root.appendChild(catContainer);

  // Product grid
  const grid = document.createElement("div");
  grid.className = "product-grid";
  grid.id = "productGrid";
  root.appendChild(grid);

  // Bind events
  document.querySelector("#searchInput").addEventListener("input", (e) => {
    state.search = e.target.value.toLowerCase();
    renderProducts();
  });

  document.querySelector("#sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
  });

  catContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.category = btn.dataset.category;
    renderProducts();
  });

  document.querySelector("#darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector("#darkToggle").textContent =
      document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  // Modal close
  document.querySelector("#modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains("modal-close")) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  renderProducts();
}

// ===== LỌC + SẮP XẾP =====
function getFilteredProducts() {
  let result = products.filter(p => {
    const matchCat    = state.category === "all" || p.category === state.category;
    const matchSearch = p.name.toLowerCase().includes(state.search);
    return matchCat && matchSearch;
  });

  if (state.sort === "price-asc")   result.sort((a,b) => a.price - b.price);
  if (state.sort === "price-desc")  result.sort((a,b) => b.price - a.price);
  if (state.sort === "name-az")     result.sort((a,b) => a.name.localeCompare(b.name));
  if (state.sort === "rating-desc") result.sort((a,b) => b.rating - a.rating);

  return result;
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const grid = document.querySelector("#productGrid");
  grid.innerHTML = "";

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    const msg = document.createElement("div");
    msg.className = "no-results";
    msg.textContent = "Không tìm thấy sản phẩm phù hợp 😞";
    grid.appendChild(msg);
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach(p => fragment.appendChild(createProductCard(p)));
  grid.appendChild(fragment);
}

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "₫";
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.id = product.id;

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const cat  = document.createElement("div"); cat.className = "card-category"; cat.textContent = product.category;
  const name = document.createElement("div"); name.className = "card-name";     name.textContent = product.name;
  const stars = "⭐".repeat(Math.round(product.rating)) + ` ${product.rating}`;
  const rating = document.createElement("div"); rating.className = "card-rating"; rating.textContent = stars;

  const footer = document.createElement("div"); footer.className = "card-footer";
  const price  = document.createElement("div"); price.className = "card-price"; price.textContent = formatPrice(product.price);

  if (product.inStock) {
    const btn = document.createElement("button");
    btn.className = "add-cart-btn";
    btn.textContent = "+ Giỏ";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart();
    });
    footer.appendChild(price);
    footer.appendChild(btn);
  } else {
    const oos = document.createElement("span"); oos.className = "out-of-stock"; oos.textContent = "Hết hàng";
    footer.appendChild(price);
    footer.appendChild(oos);
  }

  body.append(cat, name, rating, footer);
  card.append(img, body);

  card.addEventListener("click", () => openModal(product));
  return card;
}

// ===== CART =====
function addToCart() {
  state.cart++;
  const badge = document.querySelector("#cartBadge");
  badge.textContent = state.cart;
  badge.classList.add("visible");
}

// ===== MODAL =====
function openModal(product) {
  const overlay = document.querySelector("#modal-overlay");
  overlay.innerHTML = "";
  overlay.classList.remove("hidden");

  const modal = document.createElement("div");
  modal.className = "modal";

  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.textContent = "✕";
  closeBtn.setAttribute("aria-label", "Đóng");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  const h2    = document.createElement("h2");    h2.textContent    = product.name;
  const price = document.createElement("div");   price.className   = "modal-price"; price.textContent = formatPrice(product.price);
  const desc  = document.createElement("p");     desc.textContent  = `Danh mục: ${product.category} · Đánh giá: ⭐ ${product.rating} · ${product.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}`;

  modal.append(closeBtn, img, h2, price, desc);
  overlay.appendChild(modal);
}

function closeModal() {
  document.querySelector("#modal-overlay").classList.add("hidden");
}

// ===== KHỞI ĐỘNG =====
initUI();