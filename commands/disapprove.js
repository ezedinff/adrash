module.exports = (bot, msg, firebase) => {
  bot.sendChatAction(msg.chat.id, 'typing');

  const id = Number.parseInt(msg.text.match(/^\/disapprove_(\d+)$/)[1], 10);
    firebase.updateData(id, {approved: false})
    .then(() => {
      bot.sendMessage(msg.chat.id, 'NOOICE 👍🏿');
    }, () => {
      bot.sendMessage(msg.chat.id, 'NOOICE?');
    });
};
