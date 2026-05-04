const CART_KEY = "gloria_cart_v1";

const state = {
  tab: "eat",
  openedCategory: null,
  cart: [],
};

const heroSlides = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
];

const categories = [
  {
    id: "pizze",
    tab: "eat",
    name: "LES PIZZAS",
    text: "Parce que parfois, tout ce dont on a besoin, c'est d'un peu de magie ronde et croustillante.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "PIZZA MARGHERITA", desc: "Sauce tomate, mozzarella, basilic", price: 36 },
      { name: "PIZZA GOURMET", desc: "Roquette, poulet fumé, tomates cerises", price: 42 },
      { name: "PIZZA AL TONNO", desc: "Thon, olives, crème de poivrons", price: 41 },
    ],
  },
  {
    id: "secondi",
    tab: "eat",
    name: "SECONDI",
    text: "Viandes et poissons signatures servis à la minute.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "FILETTO DI MANZO", desc: "Légumes grillés, jus réduit", price: 58 },
      { name: "SALMONE CROCCANTE", desc: "Crème citron et herbes", price: 52 },
    ],
  },
  {
    id: "aperitivi",
    tab: "drink",
    name: "APERITIVI",
    text: "Cocktails italiens à partager au coucher du soleil.",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "APEROL SPRITZ", desc: "Aperol, prosecco, orange", price: 20 },
      { name: "NEGRONI", desc: "Gin, Campari, vermouth", price: 24 },
      { name: "MARTINI ROSSO", desc: "Servi avec zeste d'orange", price: 19 },
    ],
  },
];

const el = {
  startBtn: document.getElementById("startBtn"),
  heroCard: document.getElementById("home"),
  menuApp: document.getElementById("menuApp"),
  slider: document.getElementById("slider"),
  tabs: [...document.querySelectorAll(".tab-btn")],
  categoriesList: document.getElementById("categoriesList"),
  searchInput: document.getElementById("searchInput"),
  itemsSheet: document.getElementById("itemsSheet"),
  sheetTitle: document.getElementById("sheetTitle"),
  sheetItems: document.getElementById("sheetItems"),
  closeSheet: document.getElementById("closeSheet"),
  cartCount: document.getElementById("cartCount"),
  bottomTotal: document.getElementById("bottomTotal"),
  toast: document.getElementById("toast"),
  openDrawer: document.getElementById("openDrawer"),
  topMenu: document.getElementById("topMenu"),
};

function formatDt(value) {
  return `${value.toFixed(3)} DT`;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function showToast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add("show");
  setTimeout(() => el.toast.classList.remove("show"), 2000);
}

function renderCategories() {
  const query = el.searchInput.value.trim().toLowerCase();
  const cards = categories
    .filter((c) => c.tab === state.tab)
    .filter((c) => !query || `${c.name} ${c.text}`.toLowerCase().includes(query) || c.items.some((i) => i.name.toLowerCase().includes(query)))
    .map(
      (cat) => `
      <article class="category-card">
        <img src="${cat.image}" alt="${cat.name}">
        <div>
          <h4>${cat.name}</h4>
          <p>${cat.text}</p>
          <button class="view-btn" data-id="${cat.id}">
            <span class="view-btn__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M4 12a1 1 0 0 1 1-1h9.6l-2.3-2.3a1 1 0 1 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4l2.3-2.3H5a1 1 0 0 1-1-1Z"
                />
              </svg>
            </span>
            <span class="view-btn__label">Voir le menu</span>
          </button>
        </div>
      </article>
    `
    )
    .join("");
  el.categoriesList.innerHTML = cards || "<p>Aucune catégorie.</p>";
}

function openSheet(categoryId) {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return;
  state.openedCategory = categoryId;
  el.sheetTitle.textContent = category.name;
  el.sheetItems.innerHTML = category.items
    .map(
      (item, idx) => `
      <article class="sheet-item">
        <div>
          <strong>${item.name}</strong>
          <div>${item.desc}</div>
        </div>
        <strong>${item.price}DT</strong>
        <button class="add-item" data-cat="${categoryId}" data-idx="${idx}">+</button>
      </article>
    `
    )
    .join("");
  el.itemsSheet.classList.remove("hidden");
}

function updateTotals() {
  const total = state.cart.reduce((sum, line) => sum + line.price * line.qty, 0);
  const count = state.cart.reduce((sum, line) => sum + line.qty, 0);
  el.cartCount.textContent = count;
  el.bottomTotal.textContent = `Total: ${formatDt(total)}`;
  el.bottomTotal.classList.toggle("hidden", total === 0);
  saveCart();
}

function renderCartBadgeOnly() {
  updateTotals();
}

let slideIndex = 0;
function rotateSlides() {
  el.slider.style.backgroundImage = `url("${heroSlides[slideIndex]}")`;
  slideIndex = (slideIndex + 1) % heroSlides.length;
}

el.startBtn.addEventListener("click", () => {
  el.heroCard.classList.add("hidden");
  el.menuApp.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

el.tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.tab = btn.dataset.tab;
    el.tabs.forEach((x) => x.classList.toggle("active", x === btn));
    renderCategories();
  });
});

el.searchInput.addEventListener("input", renderCategories);

el.categoriesList.addEventListener("click", (e) => {
  if (e.target.matches(".view-btn")) openSheet(e.target.dataset.id);
});

el.closeSheet.addEventListener("click", () => el.itemsSheet.classList.add("hidden"));

el.sheetItems.addEventListener("click", (e) => {
  if (!e.target.matches(".add-item")) return;
  const cat = categories.find((c) => c.id === e.target.dataset.cat);
  if (!cat) return;
  const item = cat.items[Number(e.target.dataset.idx)];
  const existing = state.cart.find((x) => x.name === item.name);
  if (existing) existing.qty += 1;
  else state.cart.push({ ...item, qty: 1 });
  renderCartBadgeOnly();
  showToast("Ajouté au panier");
});

function toggleTopMenu() {
  el.topMenu.classList.toggle("hidden");
}
el.openDrawer.addEventListener("click", toggleTopMenu);
document.addEventListener("click", (e) => {
  if (el.topMenu.classList.contains("hidden")) return;
  const clickedInside = el.topMenu.contains(e.target) || e.target === el.openDrawer;
  if (!clickedInside) el.topMenu.classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}

rotateSlides();
setInterval(rotateSlides, 3500);
renderCategories();
state.cart = loadCart();
renderCartBadgeOnly();

// iOS/Safari: prevent double-tap to zoom
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  },
  { passive: false }
);
