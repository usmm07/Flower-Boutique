const TelegramBot = require('node-telegram-bot-api');


const TOKEN = '8013745077:AAED5ngyFoq6CyEgtdjJwdzCc46DCOiGIz8'; 

// 🌐 URL Mini App
const WEB_APP_URL = 'https://flower-boutique.vercel.app'; 

// 🧍 Админ — ты
const ADMIN_ID = 1491633008;

const bot = new TelegramBot(TOKEN, { polling: true });

// 🔹 Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;

  // Приветствие
  bot.sendMessage(chatId, `👋 Привет, ${name}!\nДобро пожаловать в Flower Boutique 🌸`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🛍 Перейти в магазин', web_app: { url: WEB_APP_URL } }]
      ]
    }
  });

  // Лог админу
  if (chatId !== ADMIN_ID) {
    bot.sendMessage(ADMIN_ID, `📥 Новый пользователь: ${name} (ID: ${chatId}) запустил бота.`);
  }
});

// 🔹 Обработка заказа из Mini App
bot.on('message', (msg) => {
  const data = msg?.web_app_data?.data;
  if (!data) return;

  try {
    const payload = JSON.parse(data);
    const order = payload.order;

    if (!Array.isArray(order)) return;

    const orderList = order
      .map(item => `• ${item.name} — ${item.price.toLocaleString()} UZS`)
      .join('\n');
    
    const total = order.reduce((sum, item) => sum + item.price, 0);
    const finalMessage = `🧾 *Новый заказ!*\n\n${orderList}\n\n💰 *Итого:* ${total.toLocaleString()} UZS\n👤 *От:* ${msg.from.first_name} (${msg.from.id})`;

    bot.sendMessage(ADMIN_ID, finalMessage, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('Ошибка при обработке заказа:', err);
    bot.sendMessage(ADMIN_ID, '❌ Ошибка при получении заказа.');
  }
});
