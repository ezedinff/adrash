const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf('649515347:AAGFcnAi7olLsuxlZa4aQHesCkWcdxCmYAs');
bot.command('start', ( ctx ) =>
    ctx.replyWithHTML(`welcome <b>${ctx.from.first_name}!</b> \nwe are glad to have u as contributor`, Markup
        .keyboard(['/register'])
        .oneTime()
        .resize()
        .extra()
    )
);
bot.command('register', (ctx) => {
    ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
        return markup.resize()
            .keyboard([
                markup.locationRequestButton('Send location')
            ])
    })).then(async (location) => {
       await ctx.reply(`please Enter place name ${JSON.stringify(location)}`);
    })
});
bot.telegram.('Send location', (ctx) =>
    ctx.reply(`please Enter place name`)
);
bot.on('text', (ctx) => {
    return ctx.reply('This city is not exists');
});
bot.launch();