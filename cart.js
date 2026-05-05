const CART_KEY = "gloria_cart_v1";

const el = {
  items: document.getElementById("cartPageItems"),
  total: document.getElementById("cartPageTotal"),
  toast: document.getElementById("toast"),
};

function formatDt(value) {
  return `${value.toFixed(3)} DT`;
}

function showToast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add("show");
  setTimeout(() => el.toast.classList.remove("show"), 2000);
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

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function render() {
  const cart = loadCart();
  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  el.total.textContent = `Total: ${formatDt(total)}`;

  if (!cart.length) {
    el.items.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }

  el.items.innerHTML = cart
    .map(
      (line, idx) => `
      <div class="cart-line">
        <div>
          <strong>${line.name}</strong><br />
          <small>${line.price}DT</small>
        </div>
        <div class="cart-actions">
          <button class="qty-btn" data-type="inc" data-idx="${idx}">+</button>
          <span>${line.qty}</span>
          <button class="qty-btn" data-type="dec" data-idx="${idx}">-</button>
        </div>
      </div>
    `
    )
    .join("") +
    `
      <button class="start-btn" id="validateBtn" style="margin-top: 1rem">Valider</button>
    `;

  document.getElementById("validateBtn").addEventListener("click", () => {
    showToast("Commande envoyée au serveur");
    saveCart([]);
    render();
  });
}

el.items.addEventListener("click", (e) => {
  if (!e.target.matches(".qty-btn")) return;
  const type = e.target.dataset.type;
  const idx = Number(e.target.dataset.idx);
  const cart = loadCart();
  const line = cart[idx];
  if (!line) return;
  if (type === "inc") line.qty += 1;
  if (type === "dec") line.qty -= 1;
  const next = cart.filter((x) => x.qty > 0);
  saveCart(next);
  render();
});

render();

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

