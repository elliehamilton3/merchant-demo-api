import moment from 'moment';
import Merchants from '../models/Merchants.json';
import Transactions from '../models/Transactions.json';
// TODO:
// Add interfaces for types
// dont get filtered list twice
// handle if returns non/error

export function filterAndGroupTransactions(start: Date, end?: Date) {
  const startDate = moment(start);
  const endDateOrNow = !end ? new Date() : end;
  const endDate = moment(endDateOrNow);
  const helper:any = {};

  const filteredTransactions = Transactions
    .filter(({ date }) => {
      const dateFormatted = moment(date, 'DD-MM-YYYY');
      return dateFormatted.isSameOrAfter(startDate) && dateFormatted.isSameOrBefore(endDate);
    })
    .reduce((r, o) => {
      const key = `${o.user_id}-${o.merchant_id}`;

      if (!helper[key]) {
        helper[key] = { ...o };
        r.push(helper[key]);
      } else {
        helper[key].amount += o.amount;
      }

      return r;
    }, []);
  return filteredTransactions;
}

export function getRank(userId: string, merchantId: string, start: Date, end: Date) {
  const filteredTransactions = filterAndGroupTransactions(start, end);
  const merchantTransactions = filteredTransactions
    .filter(({ merchant_id }) => merchant_id === merchantId);
  const index = merchantTransactions
    .sort((a, b) => b.amount - a.amount)
    .findIndex((transaction) => transaction.user_id === userId);
  const rank = Math.round((1 - (index / (merchantTransactions.length))) * 1000) / 1000;
  return rank;
}

function getRankingForUser(userId: string, start: Date, end?: Date) {
  const filteredTransactions = filterAndGroupTransactions(start, end);
  const merchants = filteredTransactions.filter(
    (transaction) => transaction.user_id === userId,
  ).map((transaction) => {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      display_name, icon_url, funny_gif_url, id,
    } = Merchants
      .find((merchant) => merchant.id === transaction.merchant_id);

    return {
      display_name,
      icon_url,
      funny_gif_url,
      ranking: getRank(userId, id, start, end),
    };
  });

  return merchants;
}

export default getRankingForUser;
