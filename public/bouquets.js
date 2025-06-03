const tg = window.Telegram.WebApp;
tg.expand();

const bouquets = [
  { id: "b1", name: "Красные розы", price: 170000, img: "https://images.pexels.com/photos/1021728/pexels-photo-1021728.jpeg" },
  { id: "b2", name: "Микс с пионами", price: 250000, img: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg" },
  { id: "b3", name: "Тюльпаны", price: 200000, img: "https://images.pexels.com/photos/2129979/pexels-photo-2129979.jpeg" },
  { id: "b4", name: "Белые лилии", price: 180000, img: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg" }
];

let cart = [];

function renderCart() {
  const count = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-count").innerText = `${count} товаров`;
  document.getElementById("cart-total").innerText = `${total.toLocaleString()} UZS`;
}

function addToCart(item) {
  cart.push(item);
  renderCart();
}

function createCard(bouquet) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${bouquet.img}?auto=compress&cs=tinysrgb&dpr=2&h=300" alt="${bouquet.name}" />
    <div class="card-content">
      <div class="card-title">${bouquet.name}</div>
      <div class="card-price">${bouquet.price.toLocaleString()} UZS</div>
      <button class="add-btn">В корзину</button>
    </div>
  `;
  card.querySelector(".add-btn").addEventListener("click", () => addToCart(bouquet));
  return card;
}

const container = document.getElementById("bouquetContainer");
bouquets.forEach(b => container.appendChild(createCard(b)));

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    tg.showAlert("Корзина пуста!");
    return;
  }
  tg.sendData(JSON.stringify({ order: cart }));
  tg.close();
});

renderCart();
