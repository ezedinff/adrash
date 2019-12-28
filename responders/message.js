const start = require('./../commands/start');
const approve = require('./../commands/approve');
const disapprove = require('./../commands/disapprove');
const ndelete = require('./../commands/delete');
const register = require('./../commands/register');
var CronJob = require('cron').CronJob;

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
  function sendToAll (message) {
    firebase.contributors().then((snapshot) => {
        snapshot.forEach(doc => {
            const cont = doc.data();
            bot.sendMessage(
                doc.id,
                `ሰላም ${cont.first_name}\n\n${bM}`
            ).then(r => console.log(r)).catch(err => console.log(err))
        });
    });
  }
  const t = msg.text ? msg.text : '';
  if (t.startsWith('###71?')) {
    const bM = msg.text.split('?')[1];
    sendToAll(bM);
  }

  // add new message to database
  if(t.startsWith('###72?')) {
      var m = msg.text.split('?')[1];
      firebase.addMessage({message: m}).then(() => {
         bot.sendMessage(
             msg.chat.id,
             'message successfully registred!!'
         );
      });
  }
  // send messages to all contributors every morning
  const job = new CronJob('00 30 8 * * 1-5', function() {
        firebase.getMessages().then((snapshot) => {
            const documents = [];
            snapshot.forEach(doc => documents.push(doc.data()));
            if (documents.length > 0) {
                const message = documents[Math.floor(Math.random() * ((documents.length - 1) - 0 + 1) + 0)];
                sendToAll(message);
            }
        })
  }, null, true, 'Africa/Nairobi');
  job.start();
  // /start
  if (msg.text === '/start') {
    start(bot, msg, firebase);
      firebase.addContributor(msg.from.id, msg.from);
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
