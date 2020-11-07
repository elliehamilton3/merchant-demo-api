import getRankingForUser, { getRank, filterAndGroupTransactions } from './getRankingForUser';
import Transactions from '../models/Transactions.json';

describe('filterAndGroupTransactions', () => {
  test('returns a list of transactions filtered by dates and grouped and end date defaults to now', () => {
    const startDate = new Date(2019, 1, 1);
    const transactions = filterAndGroupTransactions(startDate);
    expect(transactions).toStrictEqual([
      {
        amount: 50,
        date: '01-01-2020',
        description: '50 sausage rolls',
        id: 't001',
        merchant_id: 'm001',
        user_id: 'u001',
      },
      {
        amount: 10,
        date: '01-01-2020',
        description: '10 sausage rolls',
        id: 't002',
        merchant_id: 'm001',
        user_id: 'u002',
      },
      {
        amount: 100,
        date: '01-01-2020',
        description: '100 sausage rolls',
        id: 't003',
        merchant_id: 'm001',
        user_id: 'u003',
      },
      {
        amount: 1030,
        date: '01-01-2020',
        description: '20 sausage rolls',
        id: 't004',
        merchant_id: 'm001',
        user_id: 'u004',
      },
      {
        amount: 50,
        date: '01-01-2020',
        description: '50 hot dogs',
        id: 't005',
        merchant_id: 'm002',
        user_id: 'u001',
      },
    ]);
  });
  test('returns a list of transactions filtered by dates and grouped and uses end date if provided', () => {
    const startDate = new Date(2019, 1, 1);
    const endDate = new Date(2020, 6, 1);
    const transactions = filterAndGroupTransactions(startDate, endDate);
    expect(transactions).toStrictEqual([
      {
        amount: 50,
        date: '01-01-2020',
        description: '50 sausage rolls',
        id: 't001',
        merchant_id: 'm001',
        user_id: 'u001',
      },
      {
        amount: 10,
        date: '01-01-2020',
        description: '10 sausage rolls',
        id: 't002',
        merchant_id: 'm001',
        user_id: 'u002',
      },
      {
        amount: 100,
        date: '01-01-2020',
        description: '100 sausage rolls',
        id: 't003',
        merchant_id: 'm001',
        user_id: 'u003',
      },
      {
        amount: 30,
        date: '01-01-2020',
        description: '20 sausage rolls',
        id: 't004',
        merchant_id: 'm001',
        user_id: 'u004',
      },
      {
        amount: 50,
        date: '01-01-2020',
        description: '50 hot dogs',
        id: 't005',
        merchant_id: 'm002',
        user_id: 'u001',
      },
    ]);
  });
});

describe('getRank', () => {
  test('returns the rank for a user for one merchant to 3 dp', () => {
    const rank = getRank('u001', 'm001', Transactions);
    expect(rank).toBe(0.571);
  });
  test('returns the rank for a user for a different merchant 3 dp', () => {
    const rank = getRank('u001', 'm002', Transactions);
    expect(rank).toBe(1);
  });
});

describe('getRankingForUser', () => {
  test('returns a list of merchants for a user', () => {
    const startDate = new Date(2019, 1, 1);
    const merchants = getRankingForUser('u001', startDate);
    expect(merchants).toStrictEqual([{
      display_name: 'Merchant 1',
      funny_gif_url: 'http://www.gifurl.com',
      icon_url: 'http://www.iconurl.com',
      ranking: 0.5,
    }, {
      display_name: 'Merchant 2',
      funny_gif_url: 'http://www.gifurl2.com',
      icon_url: 'http://www.iconurl2.com',
      ranking: 1,
    }]);
  });

  test('returns a list of merchants for a different user', () => {
    const startDate = new Date(2019, 1, 1);
    const merchants = getRankingForUser('u002', startDate);
    expect(merchants).toStrictEqual([{
      display_name: 'Merchant 1',
      funny_gif_url: 'http://www.gifurl.com',
      icon_url: 'http://www.iconurl.com',
      ranking: 0.25,
    }]);
  });

  test('returns a list of merchants for a user when they have multiple transactions with the same merchant', () => {
    const startDate = new Date(2019, 1, 1);
    const merchants = getRankingForUser('u004', startDate);
    expect(merchants).toStrictEqual([{
      display_name: 'Merchant 1',
      funny_gif_url: 'http://www.gifurl.com',
      icon_url: 'http://www.iconurl.com',
      ranking: 1,
    }]);
  });

  test('returns a list of merchants for a user and excludes transactions outside of the date range', () => {
    const startDate = new Date(2019, 1, 1);
    const endDate = new Date(2020, 6, 1);
    const merchants = getRankingForUser('u004', startDate, endDate);
    expect(merchants).toStrictEqual([{
      display_name: 'Merchant 1',
      funny_gif_url: 'http://www.gifurl.com',
      icon_url: 'http://www.iconurl.com',
      ranking: 0.5,
    }]);
  });
});
