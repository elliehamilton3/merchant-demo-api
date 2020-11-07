import Merchants from '../models/Merchants.json';
import Transactions from '../models/Transactions.json';

export function getRank(userId: string, merchantId: string) {
  // group so can assume unique
  // Filter by time
  const merchantTransactions = Transactions
    .filter(({ merchant_id }) => merchant_id === merchantId);
  const index = merchantTransactions
    .sort((a, b) => b.amount - a.amount)
    .findIndex((transaction) => transaction.user_id === userId);
  const rank = Math.round((1 - (index / (merchantTransactions.length))) * 1000) / 1000;
  return rank;
}

function getRankingForUser(userId: string) {
  // get filtered list of transactions for time and group by merchant id
  // then filter for user
  const merchants = Transactions.filter(
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
      ranking: getRank(userId, id),
    };
  });

  return merchants;
}

export default getRankingForUser;
