module.exports = (bot, msg, firebase) => {
    console.log(msg);
    bot.sendMessage(msg.chat.id, `*እንኳን ደህና መጣህ ${msg.from.first_name}*!
    to register /register
PS
Turn on your Wi-Fi to have better accuracy

PPS
To register please 🙏🏿 make sure your GPS accuracy is within *20 meters*`, {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
    });
};
