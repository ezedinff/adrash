const A = require('./../callbacks/A');
const B = require('./../callbacks/B');
module.exports = (bot, config, firebase) => (callbackQuery) => {
  const data = JSON.parse(callbackQuery.data);

  switch (data.type) {
    case 'A':
      try {
          A(config, bot, callbackQuery, firebase, (d) => {
              B(config, bot, d, firebase);
          });
      } catch (e) {
        console.log('hmm');
      }
      return;

    case 'B':
      return;

    default:
      bot.answerCallbackQuery(callbackQuery.id, 'NOOICE?', false);
  }
};
