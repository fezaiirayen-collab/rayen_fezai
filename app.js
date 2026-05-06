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
    id: "pour-commencer",
    tab: "eat",
    name: "POUR COMMENCER",
    text: "Commencez votre repas avec un petit starter.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "BURRATA CRÉMEUSE", desc: "Tomates marinées, pesto basilic", price: 28 },
      { name: "CARPACCIO DE BŒUF", desc: "Parmesan, roquette, huile citronnée", price: 34 },
      { name: "BRUSCHETTA TRICOLORE", desc: "Tomate, ricotta, olive noire", price: 24 },
    ],
  },
  {
    id: "incontournables",
    tab: "eat",
    name: "LES INCONTOURNABLES",
    text: "Nos grands classiques, demandés chaque soir.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "RISOTTO AI FUNGHI", desc: "Crème de champignons, parmesan", price: 44 },
      { name: "PASTA AL TARTUFO", desc: "Tagliatelle, sauce truffe, pecorino", price: 48 },
      { name: "SCALOPPINA MILANESE", desc: "Escalope croustillante, citron", price: 46 },
    ],
  },
  {
    id: "tapas",
    tab: "eat",
    name: "TAPAS",
    text: "À partager entre amis autour d'un verre.",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "ARANCINI", desc: "Boulettes de riz farcies à la mozzarella", price: 22 },
      { name: "CALAMARS CROUSTILLANTS", desc: "Sauce aioli citron", price: 29 },
      { name: "MINI BRIOCHE TRUFFE", desc: "Crème mascarpone et truffe", price: 27 },
    ],
  },
  {
    id: "pizze",
    tab: "eat",
    name: "LES PIZZAS",
    text: "Parce que parfois, tout ce dont on a besoin, c'est d'un peu de magie ronde et croustillante.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
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
  {
    id: "cocktails",
    tab: "drink",
    name: "COCKTAILS",
    text: "Créations fraîches et signatures maison.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "MOJITO CLASSIQUE", desc: "Rhum, menthe fraîche, citron vert", price: 24 },
      { name: "ESPRESSO MARTINI", desc: "Vodka, café, liqueur de café", price: 26 },
      { name: "PASSION MULE", desc: "Vodka, fruit de la passion, ginger beer", price: 25 },
    ],
  },
  {
    id: "vin-blanc",
    tab: "drink",
    name: "VIN BLANC",
    text: "Sélection minérale et fruitée pour poissons et entrées.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "CHARDONNAY (VERRE)", desc: "Notes beurrées et vanillées", price: 18 },
      { name: "SAUVIGNON BLANC (VERRE)", desc: "Agrumes, finale vive", price: 17 },
      { name: "PINOT GRIGIO (BOUTEILLE)", desc: "Équilibré et floral", price: 85 },
    ],
  },
  {
    id: "vin-rose",
    tab: "drink",
    name: "VIN ROSÉ",
    text: "Parfait au coucher du soleil en terrasse.",
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "COTEAUX ROSÉ (VERRE)", desc: "Fruité, frais et léger", price: 17 },
      { name: "PROVENCE ROSÉ (VERRE)", desc: "Floral, délicat", price: 19 },
      { name: "ROSÉ PRESTIGE (BOUTEILLE)", desc: "Robe pâle, finale élégante", price: 92 },
    ],
  },
  {
    id: "vin-rouge",
    tab: "drink",
    name: "VIN ROUGE",
    text: "Rouges ronds et puissants pour accompagner les plats.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "MERLOT (VERRE)", desc: "Souple et fruit noir", price: 18 },
      { name: "CABERNET SAUVIGNON (VERRE)", desc: "Épicé et structuré", price: 20 },
      { name: "CHIANTI (BOUTEILLE)", desc: "Italien, équilibré", price: 96 },
    ],
  },
  {
    id: "mocktails",
    tab: "drink",
    name: "MOCKTAILS",
    text: "Version sans alcool, tout aussi festive.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "VIRGIN MOJITO", desc: "Menthe, citron vert, eau pétillante", price: 16 },
      { name: "BERRY FIZZ", desc: "Fruits rouges, tonic, basilic", price: 17 },
      { name: "SUNSET COOLER", desc: "Orange, passion, gingembre", price: 16 },
    ],
  },
  {
    id: "boissons-chaudes",
    tab: "drink",
    name: "BOISSONS CHAUDES",
    text: "Le final parfait après le dîner.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    items: [
      { name: "ESPRESSO ITALIEN", desc: "Court et intense", price: 8 },
      { name: "CAPPUCCINO", desc: "Crème de lait onctueuse", price: 11 },
      { name: "THÉ PREMIUM", desc: "Sélection menthe, jasmin ou noir", price: 10 },
    ],
  },
];

const el = {
  startBtn: document.getElementById("startBtn"),
  heroCard: document.getElementById("home"),
  menuApp: document.getElementById("menuApp"),
  landingSections: document.getElementById("landingSections"),
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
  homeLink: document.querySelector('.top-menu a[href="#home"]'),
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
  const featuredOrder = ["pizze", "pour-commencer", "incontournables", "tapas", "secondi"];
  const cards = categories
    .filter((c) => c.tab === state.tab)
    .filter((c) => !query || `${c.name} ${c.text}`.toLowerCase().includes(query) || c.items.some((i) => i.name.toLowerCase().includes(query)))
    .sort((a, b) => {
      if (state.tab !== "eat") return 0;
      const aIndex = featuredOrder.indexOf(a.id);
      const bIndex = featuredOrder.indexOf(b.id);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    })
    .map(
      (cat) => `
      <article class="category-card">
        <img src="${cat.image}" alt="${cat.name}">
        <div>
          <h4>${cat.name}</h4>
          <p>${cat.text}</p>
          <a class="view-btn" href="#" data-id="${cat.id}">
            <span class="view-btn__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M5 12h12" />
                <path fill="currentColor" d="M18.4 12 14 8.8v6.4L18.4 12ZM8.5 9.8l1.6 2.2-1.6 2.2-1.6-2.2 1.6-2.2Zm3.6 0 1.6 2.2-1.6 2.2-1.6-2.2 1.6-2.2Z" />
              </svg>
            </span>
            <span class="view-btn__label">Voir le menu</span>
          </a>
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

function showMenuScreen() {
  el.heroCard.classList.add("hidden");
  el.landingSections.classList.add("hidden");
  el.menuApp.classList.remove("hidden");
  el.categoriesList.classList.remove("hidden");
  if (window.location.hash !== "#menu") {
    window.history.replaceState(null, "", "#menu");
  }
}

function showHomeScreen() {
  el.heroCard.classList.remove("hidden");
  el.landingSections.classList.remove("hidden");
  el.menuApp.classList.add("hidden");
  el.categoriesList.classList.add("hidden");
  el.itemsSheet.classList.add("hidden");
  el.topMenu.classList.add("hidden");
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}

el.startBtn.addEventListener("click", () => {
  showMenuScreen();
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
  const link = e.target.closest(".view-btn");
  if (!link || !link.dataset.id) return;
  e.preventDefault();
  openSheet(link.dataset.id);
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
el.homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  showHomeScreen();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
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
if (window.location.hash === "#menu") {
  showMenuScreen();
}

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
