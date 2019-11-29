const Telegraf = require('telegraf');
const bot = new Telegraf('649515347:AAGFcnAi7olLsuxlZa4aQHesCkWcdxCmYAs');
bot.start((ctx) => ctx.reply('Welcome'));
bot.on('text', (ctx) => {
    return ctx.reply('This city is not exists');
});
bot.launch();