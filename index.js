const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf('649515347:AAGFcnAi7olLsuxlZa4aQHesCkWcdxCmYAs');
bot.command('start', ( ctx ) =>
    ctx.replyWithHTML(`welcome <b>${ctx.from.first_name}!</b> \nwe are glad to have u as contributor`, Extra.HTML().markup(m =>
        m.keyboard(['/register'])).oneTime(false)
    )

);
bot.command('register', (ctx) => {
    return ctx.reply('<b>Please Send us the location. by using the send button</b>', Extra.HTML().markup((m) =>
        m.keyboard([
            m.locationRequestButton('Send 📍'),
        ]).oneTime(false)
    ))
});
bot.on('message', (ctx) => {
    return ctx.reply(`hello ${ctx.from.username}`);
});
bot.launch();