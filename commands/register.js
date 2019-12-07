module.exports = (bot, msg, firebase) => {
  bot.sendChatAction(msg.chat.id, 'typing');
  console.log(msg);
  firebase.addContributor(msg.from.id, msg.from)
    .then(() => {
      bot.sendMessage(msg.chat.id, 'You are now a contributor 🙌🏿\n\nWhenever you send me your location I\'ll ask you if you want to register a place', {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: 'Send 📍', request_location: true }],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        }),
      });
    }, () => {
      bot.sendMessage(msg.chat.id, 'you\'re already a contributor 🙌🏿\n\nPS\nTo unregister send /unregister command', {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: 'Send 📍', request_location: true }],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        }),
      });
    });
};
