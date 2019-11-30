const A = require('./../callbacks/A');
const B = require('./../callbacks/B');

module.exports = (bot, config, firebase) => (callbackQuery) => {
  const data = JSON.parse(callbackQuery.data);

  switch (data.type) {
    // add new ATM...
    case 'A':
      try {
          A(config, bot, callbackQuery, firebase);
      } catch (e) {
        console.log('hmm');
      }
      return;

    // add new ATM [finalization]
    case 'B':
      B(config, bot, callbackQuery, firebase);
      return;

    default:
      bot.answerCallbackQuery(callbackQuery.id, 'NOOICE?', false);
  }
};
