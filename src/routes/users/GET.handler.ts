import { Request } from '@hapi/hapi';
// import Users from '../../models/Users.json';
import Merchants from '../../models/Merchants.json';
import Transactions from '../../models/Transactions.json';

export default async function getHandler(request: Request) {
// - Find all transactions in that period?
// - Find all merchant ids in that period for that user
// - For each of those merchant ids and all users sum the total spend
// - For each of those merchant ids and that user sum the total spend
// - Calculate as percentage/decimal

  // eslint-disable-next-line no-console
  console.log(
    request.params.userId,
    request.query.start.toISOString(),
    !request.query.end ? null : request.query.end.toISOString(),
  );

  // groupings
  // Filter by time
  const userTransactions = Transactions.filter(
    (transaction) => transaction.user_id === request.params.userId,
  );

  // group so can assume unique
  const index = Transactions.sort((a, b) => b.amount - a.amount)
    .findIndex((transaction) => transaction.user_id === request.params.userId);
  const rank = index / (Transactions.length - 1);
  console.log(userTransactions, rank, Transactions.length);
  // nest map
  const merchants = Merchants
    .filter((merchant) => merchant.id === userTransactions[0].merchant_id)
    .map(
      ({ display_name, icon_url, funny_gif_url }) => ({
        display_name, icon_url, funny_gif_url, ranking: rank,
      }),
    );

  return {
    merchants,
  };
}
