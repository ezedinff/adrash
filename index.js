const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const bot = new Telegraf('649515347:AAGFcnAi7olLsuxlZa4aQHesCkWcdxCmYAs');
bot.start((ctx) => ctx.reply('Welcome'));
bot.command('register', ({ reply }) =>
    reply('we are glad to have u as contributor', Markup
        .keyboard(['/simple', '/inline', '/pyramid'])
        .oneTime()
        .resize()
        .extra()
    )
)
bot.on('text', (ctx) => {
    return ctx.reply('This city is not exists');
});
bot.launch();