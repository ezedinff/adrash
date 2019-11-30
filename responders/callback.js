const A = require('./../callbacks/A');
const B = require('./../callbacks/B');

module.exports = (bot, config, moedoo) => (callbackQuery) => {
  const data = JSON.parse(callbackQuery.data);

  switch (data.type) {
    // add new ATM...
    case 'A':
      A(config, bot, callbackQuery);
      return;

    // add new ATM [finalization]
    case 'B':
      B(config, bot, callbackQuery, moedoo);
      return;

    default:
      bot.answerCallbackQuery(callbackQuery.id, 'NOOICE?', false);
  }
};
