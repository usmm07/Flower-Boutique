const tg = window.Telegram.WebApp;
tg.expand();

const bouquets = [
  {
    id: "bouquet01",
    name: "Красные розы (9 шт.)",
    price: "170 000 UZS",
    img: "https://images.unsplash.com/photo-1592928306886-f17731b1b2ae?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: "bouquet02",
    name: "Букет микс с пионами",
    price: "250 000 UZS",
    img: "https://images.unsplash.com/photo-1586864381397-b8d9eb7d98ef?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: "bouquet03",
    name: "Тюльпаны микс (15 шт.)",
    price: "200 000 UZS",
    img: "https://images.unsplash.com/photo-1559563363-2f94eecae944?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: "bouquet04",
    name: "Белые лилии",
    price: "180 000 UZS",
    img: "https://images.unsplash.com/photo-1613419780405-1a7cbd72d4c0?auto=format&fit=crop&w=400&h=300"
  }
];

const container = document.getElementById("bouquetContainer");

bouquets.forEach(bouquet => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${bouquet.img}" alt="${bouquet.name}" />
    <div class="card-content">
      <div class="card-title">${bouquet.name}</div>
      <div class="card-price">${bouquet.price}</div>
      <button class="order-btn" onclick="orderBouquet('${bouquet.id}', '${bouquet.name}', '${bouquet.price}')">Заказать</button>
    </div>
  `;
  container.appendChild(card);
});

function orderBouquet(id, name, price) {
  tg.showPopup({
    title: "Подтвердите заказ",
    message: `Вы хотите заказать: ${name} (${price})?`,
    buttons: [
      { id: "confirm", type: "default", text: "Подтвердить" },
      { id: "cancel", type: "destructive", text: "Отмена" }
    ]
  }, (buttonId) => {
    if (buttonId === "confirm") {
      tg.sendData(JSON.stringify({ bouquet_id: id, name, price }));
      tg.close();
    }
  });
}
