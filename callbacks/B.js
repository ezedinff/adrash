const moment = require('moment');

module.exports = (config, bot, callbackQuery, firebase) => {
    console.log(callbackQuery);
    const data = JSON.parse(callbackQuery.data);
  const cqBadNooice = () => {
    bot.answerCallbackQuery(callbackQuery.id, 'NOOICE?', false);
  };
    if (data.n && !data.n.contains('/')){
        firebase.addData({
            location: {
                type: 'point',
                coordinates: [data.l[0], data.l[1]]
            },
            name: data.n,
            contributor: data.cid,
            approved: false
        }).then(r => {
            bot.sendMessage(data.chatId, 'ቦታው በተሳካ ሁኔታ ተመዝግቡዋል!!\nአመሰግናለው 🙌🏿', {
                reply_to_message_id: data.mid,
            });
        });
    } else {
        bot.sendMessage(msg.chat.id, 'you\'re already a contributor 🙌🏿\n\nPS\nTo unregister send /unregister command', {
            reply_markup: JSON.stringify({
                keyboard: [
                    [{ text: 'Send 📍', request_location: true }],
                ],
                resize_keyboard: true,
                one_time_keyboard: false,
            }),
        });
    }
    return;
};
