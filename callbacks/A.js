module.exports = async (config, bot, callbackQuery, firebase, cb) => {
    const data = JSON.parse(callbackQuery.data);
    bot.sendChatAction(callbackQuery.message.chat.id, 'typing');
    const callBM = () => {
        bot.once('message', (msg) => {
            if (msg && msg.text !== '😇 Register a Place') {
                const t = msg.text ? msg.text : '';
                console.log(t);
                if (t.split('-').length < 2) {
                    bot.sendMessage(callbackQuery.message.chat.id, 'እባክዎን በድጋሚ በዚህ መሠረት ይላኩልን\n' +
                        'የታክሲ መያዢያው ቦታስም - የምን ታክሲ እየያዙ እንዳሉ', {
                        reply_to_message_id: callbackQuery.message.reply_to_message.message_id,
                    }).then((p) => callBM());
                } else {
                    cb({data:  JSON.stringify({chatId: msg.chat.id, mid: msg.message_id, l: data.l, n: msg.text, cid: msg.from.id})})
                }
            }
        });
    };
    // const inlineKeyboard = config.BANKS.map((bank, index) => [{ text: bank, callback_data: JSON.stringify({ type: 'B', i: index, l: data.l }) }]);

    bot.answerCallbackQuery(callbackQuery.id, 'NOOICE!', false);
    bot.sendMessage(callbackQuery.message.chat.id, 'በዚህ መሠረት ይላኩልን\n' +
        'የታክሲ መያዢያው ቦታስም - የምን ታክሲ እየያዙ እንዳሉ', {
        reply_to_message_id: callbackQuery.message.reply_to_message.message_id
    }).then((payload) => {
        callBM();
    });
};
