const axios = require('axios');
const money = require('money');

/**
 * url of the convertion rate btw currency, return a json, base EUR
 */ 
const RATES_URL = 'https://api.exchangeratesapi.io/latest';

/**
 * url of the convertion rate btw currency for bitcoin, return a json
 */ 
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';

const CURRENCY_BITCOIN = 'BTC';

const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN);


/**
 * return the conversion btw the currency mentioned
 * if no currency is mentioned, use US dollars to bitcoin
 * error if unknown currency 
 */ 
module.exports = async opts => {
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts;
  const promises = [];
  let base = from;

  const anyBTC = isAnyBTC(from, to);

  /**
 * if input contain the bitcoin currency
 * use the bitcoin website
 */ 
  if (anyBTC) {
    base = from === CURRENCY_BITCOIN ? to : from;
    promises.push(axios(BLOCKCHAIN_URL));
  }

  /**
 * request the conversion rate to other currency base on the first mentioned
 */ 
  promises.unshift(axios(`${RATES_URL}?base=${base}`));

  try {
    const responses = await Promise.all(promises);
    const [rates] = responses;

    money.base = rates.data.base;
    money.rates = rates.data.rates;

    const conversionOpts = {
      from,
      to
    };

    /**
    * if input contain the bitcoin currency
    * request the exchange rate
    */ 
    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );

      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });
    }

      /**
 * create the from to
   */ 
    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }
    
    return money.convert(amount, conversionOpts);
  } catch (error) {
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!'
    );
  }
};
