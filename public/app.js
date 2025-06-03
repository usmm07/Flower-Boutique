const tg = window.Telegram.WebApp;
tg.expand();

const bouquets = [...]; // ← сюда вставь массив с 13 букетами (уже был выше)

let cart = [];

function renderBouquets() {
  const container = document.getElementById("bouquetContainer");
  container.innerHTML = "";
  bouquets.forEach(b => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${b.img}" alt="${b.name}" />
      <div class="card-content">
        <div class="card-title">${b.name}</div>
        <div class="card-price">${b.price.toLocaleString()} UZS</div>
        <button class="add-btn">В корзину</button>
      </div>
    `;
    card.querySelector(".add-btn").onclick = () => {
      cart.push(b);
      updateCart();
    };
    container.appendChild(card);
  });
}

function updateCart() {
  const count = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-count").textContent = `${count}`;
  document.getElementById("cart-total").textContent = `${total.toLocaleString()} UZS`;
}

document.getElementById("checkout-btn").onclick = () => {
  if (cart.length === 0) return tg.showAlert("Корзина пуста");
  const name = tg.initDataUnsafe?.user?.first_name || "Гость";
  const phone = document.getElementById("phoneInput").value || "не указан";
  tg.sendData(JSON.stringify({ order: cart, user: name, phone }));
  tg.close();
};

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

function fillUser() {
  const user = tg.initDataUnsafe.user;
  if (user) {
    document.getElementById("userName").textContent = user.first_name;
  }
}

renderBouquets();
fillUser();
updateCart();
