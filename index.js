/* eslint no-console: 0 */
const TelegramBot = require('node-telegram-bot-api');
const message = require('./responders/message');
const callbackQuery = require('./responders/callback');
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
bot.on('message', message(bot, {}, firebase.Firebase));
bot.on('callback_query', callbackQuery(bot, {}, firebase.Firebase));