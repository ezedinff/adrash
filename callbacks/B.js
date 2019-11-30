const moment = require('moment');

module.exports = (config, bot, callbackQuery, firebase) => {
  const data = JSON.parse(callbackQuery.data);
  const cqBadNooice = () => {
    bot.answerCallbackQuery(callbackQuery.id, 'NOOICE?', false);
  };
    firebase.addData({
        location: {
            type: 'point',
            coordinates: [data.l[0], data.l[1]]
        },
        name: data.n,
        approved: false
    })
        .then((rowsInsert) => {
            if (rowsInsert.length === 1) {
                bot.answerCallbackQuery(callbackQuery.id, 'NOOICE!', false);
               // const atm = rowsInsert[0];

                bot
                    .editMessageText(`አመሰግናለው 🙌🏿\n\nPS\nThe moderators have been notified 📣`, {
                        message_id: callbackQuery.message.message_id,
                        chat_id: callbackQuery.message.chat.id,
                    })
                    .then(() => {
                        bot.sendDocument(callbackQuery.message.chat.id, config.GIF);
                    });

                return;
            }

            cqBadNooice();
        }, cqBadNooice);
};
