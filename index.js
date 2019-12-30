/* eslint no-console: 0 */
const TelegramBot = require('node-telegram-bot-api');
const message = require('./responders/message');
const callbackQuery = require('./responders/callback');
var CronJob = require('cron').CronJob;
const options = {
    webHook: {
        port: process.env.PORT,
    },
};
const TOKEN = '649515347:AAGFcnAi7olLsuxlZa4aQHesCkWcdxCmYAs';
const bot = new TelegramBot(TOKEN,  options);
const url = 'https://adrashye.herokuapp.com:443';
const firebase = require('./lib/firebase');
const Firebase = new firebase.Firebase();

bot.setWebHook(`${url}/bot${TOKEN}`);
bot.on('message', message(bot, [], firebase.Firebase));
bot.on('callback_query', callbackQuery(bot, [], firebase.Firebase));
function sendToAll (message) {
    firebase.Firebase.contributors().then((snapshot) => {
        snapshot.forEach(doc => {
            const cont = doc.data();
            bot.sendMessage(
                doc.id,
                `ሰላም ${cont.first_name}\n\n${message}`
            ).then(r => console.log(r)).catch(err => console.log(err))
        });
    });
  }
//  // send messages to all contributors every morning
// const job = new CronJob('00 10 7 * * 0-6', function() {
//     firebase.Firebase.getMessages().then((snapshot) => {
//             const documents = [];
//             snapshot.forEach(doc => {
//                 const t = doc.data();
//                 documents.push(t.message)
//             });
//             if (documents.length > 0) {
//                 const message = documents[Math.floor(Math.random() * ((documents.length - 1) - 0 + 1) + 0)];
//                 sendToAll(message);
//             }
//         })
//   });
//   job.start();

  // 00 28 8 * * 1-6
const day = 1000 * 60 * 60 * 24;
setInterval(() => {
    firebase.Firebase.getMessages().then((snapshot) => {
            const documents = [];
            snapshot.forEach(doc => {
                const t = doc.data();
                documents.push(t.message)
            });
            if (documents.length > 0) {
                const message = documents[Math.floor(Math.random() * ((documents.length - 1) - 0 + 1) + 0)];
                sendToAll(message);
            }
        })
  }, day);