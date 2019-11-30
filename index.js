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
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
        m.inlineKeyboard([
            m.callbackButton({ text: '😇 Register an 🏧 📍', callback_data: JSON.stringify({ type: 'A', l: [ctx.location.latitude, ctx.location.longitude] }) }),
        ])))
});
bot.action('Coke',  (ctx, next) => {
  return ctx.reply('👍 hi').then(next)
});
bot.on('message', (ctx) => {
    return ctx.reply(JSON.stringify(ctx));
});
bot.launch();