module.exports = (bot, msg, firebase) => {
    console.log(msg);
    bot.sendMessage(msg.chat.id ? msg.chat.id : msg.from.id, 'You are now a contributor 🙌🏿\n\nWhenever you send me your location I\'ll ask you if you want to register a place. \n\n to send me your location please click the Send Location button.', {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: 'Send Location 📍', request_location: true }],
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
        }),
    });
};
