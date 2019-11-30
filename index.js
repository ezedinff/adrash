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
    ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
        m.keyboard([
            m.locationRequestButton('Send 📍'),
        ]).oneTime(false)
    )).then((msg) => {
        return ctx.reply(String(msg.location.latitude))
    }, () => ctx.reply(JSON.stringify(msg)))
});
bot.action('Register',  (ctx, next) => {
  return ctx.reply('👍 hi ' + ctx.longitude).then(next)
});
bot.on('text', (ctx) => {
    return ctx.reply(JSON.stringify(ctx));
});
bot.launch();