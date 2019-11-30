const start = require('./../commands/start');
const approve = require('./../commands/approve');
const disapprove = require('./../commands/disapprove');
const ndelete = require('./../commands/delete');
const register = require('./../commands/register');

// all will happen inside a `message` - middleware will be applied
// to break the monolithic crap here
module.exports = (bot, config, firebase) => (msg) => {
  if (Object.prototype.hasOwnProperty.call(msg, 'location')) {
    bot.sendChatAction(msg.chat.id, 'typing');
    // contributors
    firebase.findContributor(msg.from.id)
      .then((contributors) => {
        if (contributors.length === 1) {
          bot.sendMessage(msg.chat.id, 'NOOICE! 📍', {
            reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [{ text: '😇 Register an 🏧 📍', callback_data: JSON.stringify({ type: 'A', l: [msg.location.latitude, msg.location.longitude] }) }],
              ],
            }),
          });
        }

      }, () => {
        bot.sendMessage(msg.chat.id, 'NOOICE?');
      });

    return;
  }

  // /start
  if (msg.text === '/start') {
    start(bot, msg, moedoo);
    return;
  }
  if (msg.text === '/register') {
    register(bot, msg, moedoo);
    return;
  }
  // NOOICE 👑 actions
  if (config.NOOICE.includes(msg.from.id)) {
    if (msg.text === '/pending') {
      pending(bot, msg, moedoo);
      return;
    }

    if (msg.text.search(/^\/approve_\d+$/) === 0) {
      approve(bot, msg, moedoo);
      return;
    }

    if (msg.text.search(/^\/disapprove_\d+$/) === 0) {
      disapprove(bot, msg, moedoo);
      return;
    }

    if (msg.text.search(/^\/delete_\d+$/) === 0) {
      ndelete(bot, msg, moedoo);
      return;
    }
  }

  bot.sendChatAction(msg.chat.id, 'typing');
  bot.sendMessage(msg.chat.id, 'NOOICE?', {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: 'Send 📍', request_location: true }],
        [{ text: 'ቀን / Date' }, { text: 'NOOICE!' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    }),
  });
};
