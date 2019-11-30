module.exports = (bot, msg, firebase) => {
  bot.sendChatAction(msg.chat.id, 'typing');

  const id = Number.parseInt(msg.text.match(/^\/delete_(\d+)$/)[1], 10);

  firebase.deleteData(id)
    .then(() => {
      bot.sendMessage(msg.chat.id, 'NOOICE 👍🏿');
    }, () => {
      bot.sendMessage(msg.chat.id, 'NOOICE?');
    });
};
