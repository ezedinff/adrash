const A = require('./../callbacks/A');
const B = require('./../callbacks/B');
const c = [];
module.exports = (bot, config, firebase) => (callbackQuery) => {
  const data = JSON.parse(callbackQuery.data);

  switch (data.type) {
    case 'A':
      try {
          A(config, bot, callbackQuery, firebase, (d) => {
            c.push(d.data.n);
              B(c, bot, d, firebase);
          });
      } catch (e) {
        console.log('hmm');
      }
      return;

    // add new ATM [finalization]
    case 'B':
      return;

    default:
      bot.answerCallbackQuery(callbackQuery.id, 'NOOICE?', false);
  }
};
