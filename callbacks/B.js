const moment = require('moment');

module.exports = (config, bot, callbackQuery, firebase) => {
    console.log(callbackQuery);
    const data = JSON.parse(callbackQuery.data);
  const cqBadNooice = () => {
    bot.answerCallbackQuery(callbackQuery.id, 'NOOICE?', false);
  };
  const f = config.filter(c => c === data.n);
    if (data.n && !data.n.includes('/') && f.length <= 1){
        firebase.addData({
            location: {
                type: 'point',
                coordinates: [data.l[0], data.l[1]]
            },
            name: data.n,
            contributor: data.cid,
            approved: false
        });
        bot.sendMessage(data.chatId, 'ቦታው በተሳካ ሁኔታ ተመዝግቡዋል!!\nአመሰግናለው 🙌🏿', {
            reply_to_message_id: data.mid,
        });
    }
    return;
};
