const TelegramBot = require('node-telegram-bot-api');
const token = '8013745077:AAED5ngyFoq6CyEgtdjJwdzCc46DCOiGIz8';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  if (msg.text === '/start') {
    bot.sendMessage(msg.chat.id, '🌸 Добро пожаловать в Flower Boutique!\nОткройте магазин: [Перейти](https://твой-домен.vercel.app)', {
      parse_mode: 'Markdown'
    });
  }
});

bot.on('web_app_data', (msg) => {
  const data = JSON.parse(msg.web_app_data.data);
  const text = `🛍 Новый заказ от ${data.user} (${data.phone}):\n\n` + data.order.map(
    (item, i) => `${i + 1}) ${item.name} – ${item.price.toLocaleString()} UZS`
  ).join('\n');
  bot.sendMessage(msg.chat.id, text);
});
