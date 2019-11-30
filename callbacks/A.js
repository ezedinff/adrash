const B = require('./../callbacks/B');

module.exports = (config, bot, callbackQuery, firebase) => {
  const data = JSON.parse(callbackQuery.data);

  bot.sendChatAction(callbackQuery.message.chat.id, 'typing');

 // const inlineKeyboard = config.BANKS.map((bank, index) => [{ text: bank, callback_data: JSON.stringify({ type: 'B', i: index, l: data.l }) }]);

  bot.answerCallbackQuery(callbackQuery.id, 'NOOICE!', false);
  bot.sendMessage(callbackQuery.message.chat.id, 'የቦታው ስም?', {
    reply_to_message_id: callbackQuery.message.reply_to_message.message_id,
  });
  bot.on('message', (msg) => {
      try {
          B(config, bot, {data:  JSON.stringify({chatId: msg.chat.id, mid: msg.message_id, l: data.l, n: msg.text, cid: msg.from.id})}, firebase);
          bot.sendMessage(callbackQuery.message.chat.id, 'ቦታው በተሳካ ሁኔታ ተመዝግቡዋል!!', {
              reply_to_message_id: callbackQuery.message.reply_to_message.message_id,
          });
      } catch (e) {
          bot.sendMessage(callbackQuery.message.chat.id, 'ቦታው በተሳካ ሁኔታ ተመዝግቡዋል!!', {
              reply_to_message_id: callbackQuery.message.reply_to_message.message_id,
          });
      }
  })
};
