/* eslint no-console: 0 */
const TelegramBot = require('node-telegram-bot-api');
const message = require('./responders/message');
const callbackQuery = require('./responders/callback');

const TOKEN = '649515347:AAGFcnAi7olLsuxlZa4aQHesCkWcdxCmYAs';
const bot = new TelegramBot(TOKEN,  {polling: true});
const url = 'https://adrashye.herokuapp.com:443';
const firebase = require('./lib/firebase');
const Firebase = new firebase.Firebase();


bot.on('message', message(bot, {}, firebase.Firebase));
bot.on('callback_query', callbackQuery(bot, {}, firebase.Firebase));