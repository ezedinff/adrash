const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { leave } = Stage

/*bot.command('register', (ctx) => {
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
});*/

// Greeter scene
const greeter = new Scene('registration');
greeter.enter((ctx) => ctx.reply('we are glad to have u as contributor',
    Extra.HTML().markup((m) =>
        m.keyboard([
            m.locationRequestButton('Send 📍'),
        ]).oneTime(false)
    )));
greeter.leave((ctx) => ctx.reply('Bye'));
greeter.hears(/hi/gi, leave());
greeter.on('message', (ctx) => ctx.reply('Send hi' + JSON.stringify(ctx)));

// Create scene manager
const stage = new Stage();
stage.command('cancel', leave());

// Scene registration
stage.register(greeter)
const bot = new Telegraf('649515347:AAGFcnAi7olLsuxlZa4aQHesCkWcdxCmYAs');
bot.command('start', ( ctx ) =>
    ctx.replyWithHTML(`welcome <b>${ctx.from.first_name}!</b> \n`)
);
bot.use(session());
bot.use(stage.middleware());
bot.command('register', (ctx) => ctx.scene.enter('registration'))
bot.startPolling()
bot.on('text', (ctx) => {
    return ctx.reply(JSON.stringify(ctx));
});
bot.launch();