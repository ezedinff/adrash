const start = require('./../commands/start');
const approve = require('./../commands/approve');
const disapprove = require('./../commands/disapprove');
const ndelete = require('./../commands/delete');
const register = require('./../commands/register');

// all will happen inside a `message` - middleware will be applied
// to break the monolithic crap here
module.exports = (bot, config, firebase) => (msg) => {
  if (Object.prototype.hasOwnProperty.call(msg, 'location')) {
      bot.sendMessage(msg.chat.id, 'Register', {
          reply_to_message_id: msg.message_id,
          reply_markup: JSON.stringify({
              inline_keyboard: [
                  [{ text: '😇 Register a Place', callback_data: JSON.stringify({ type: 'A', l: [msg.location.latitude, msg.location.longitude] }) }],
              ],
          }),
      });
  }
  if (msg.text.startsWith('###71?')) {
        firebase.contributors().then((contributors) => {
            console.log(contributors);
            const bM = msg.text.split('?')[1];
            for(const contributor of contributors) {
                bot.sendMessage(
                    contributor.id,
                    `ሰላም ${contributor.first_name}\n\n${bM}`
                )
            }
        })
  }

  // /start
  if (msg.text === '/start') {
    start(bot, msg, firebase);
    return;
  }
  if (msg.text === '/register') {
    register(bot, msg, firebase);
    return;
  }
/*  // NOOICE 👑 actions
    if (msg.text.search(/^\/approve_\d+$/) === 0) {
        approve(bot, msg, firebase);
        return;
    }

    if (msg.text.search(/^\/disapprove_\d+$/) === 0) {
        disapprove(bot, msg, firebase);
        return;
    }

    if (msg.text.search(/^\/delete_\d+$/) === 0) {
        ndelete(bot, msg, firebase);
        return;
    }*/
};
