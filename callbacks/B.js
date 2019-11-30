const moment = require('moment');

module.exports = (config, bot, callbackQuery, firebase) => {
    console.log(callbackQuery);
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
        contributor: data.cid,
        approved: false
    })
        .then((rowsInsert) => {
            bot.answerCallbackQuery(callbackQuery.id, 'NOOICE!', false);
            // const atm = rowsInsert[0];

            bot
                .editMessageText(`አመሰግናለው 🙌🏿\n\nPS\nThe moderators have been notified 📣`, {
                    message_id: data.mid,
                    chat_id: data.chatId,
                }).then(() => {
                bot.sendDocument(data.chatId, 'http://i.giphy.com/PhKhSXofSAm3e.gif');
            });


            cqBadNooice();
        }, cqBadNooice);
};
