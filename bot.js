const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '8013745077:AAED5ngyFoq6CyEgtdjJwdzCc46DCOiGIz8';
const bot = new TelegramBot(TOKEN, { polling: true });

const WEB_APP_URL = 'https://flower-boutique.vercel.app';

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `👋 Привет, ${msg.from.first_name}! Добро пожаловать в Flower Boutique 🌸`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🛍 Перейти в магазин", web_app: { url: WEB_APP_URL } }]
      ]
    }
  });
});

bot.on('message', (msg) => {
  if (msg?.web_app_data?.data) {
    const data = JSON.parse(msg.web_app_data.data);
    const orderText = data.order.map(b => `• ${b.name} — ${b.price.toLocaleString()} UZS`).join("\n");
    const total = data.order.reduce((sum, b) => sum + b.price, 0);

    const finalText = `🧾 Новый заказ!\n\n${orderText}\n\n💰 Итого: ${total.toLocaleString()} UZS\n👤 Пользователь: ${msg.from.first_name}`;

    bot.sendMessage(1491633008, finalText);
  }
});
