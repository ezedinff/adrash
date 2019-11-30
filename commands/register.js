module.exports = (bot, msg, firebase) => {
  bot.sendChatAction(msg.chat.id, 'typing');

  firebase.addContributor(msg.from.id)
    .then(() => {
      bot.sendMessage(msg.chat.id, 'NOOICE!\nYou are now a contributor 🙌🏿\n\nWhenever you send me your location I\'ll ask you if you want to register an 🏧', {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: 'Send 📍', request_location: true }],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        }),
      });
    }, () => {
      bot.sendMessage(msg.chat.id, 'DOUBLE NOOICE!\nTho you\'re already a contributor 🙌🏿\n\nPS\nTo unregister send /unregister command', {
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
