const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf('649515347:AAGFcnAi7olLsuxlZa4aQHesCkWcdxCmYAs');
bot.start((ctx) => ctx.reply('Welcome'));
bot.command('start', ({ reply }) =>
    reply('welcome! \n we are glad to have u as contributor', Markup
        .keyboard(['/register'])
        .oneTime()
        .resize()
        .extra()
    )
);
bot.command('register', ({reply}) =>
    reply('Enter your location',
        Markup.keyboard([{text: 'My Location', request_location: true}])
            .oneTime()
            .resize()
            .extra()
    )
);
bot.on('text', (ctx) => {
    return ctx.reply('This city is not exists');
});
bot.launch();