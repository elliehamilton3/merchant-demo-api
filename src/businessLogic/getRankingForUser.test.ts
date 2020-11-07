import getRankingForUser, { getRank } from './getRankingForUser';

describe('getRank', () => {
  test('returns the rank for a user for one merchant to 3 dp', () => {
    const rank = getRank('u001', 'm001');
    expect(rank).toBe(0.75);
  });
  test('returns the rank for a user for a different merchant 3 dp', () => {
    const rank = getRank('u001', 'm002');
    expect(rank).toBe(1);
  });
});

describe('getRankingForUser', () => {
  test('returns a list of merchants for a user', () => {
    const merchants = getRankingForUser('u001');
    expect(merchants).toStrictEqual([{
      display_name: 'Merchant 1',
      funny_gif_url: 'http://www.gifurl.com',
      icon_url: 'http://www.iconurl.com',
      ranking: 0.75,
    }, {
      display_name: 'Merchant 2',
      funny_gif_url: 'http://www.gifurl2.com',
      icon_url: 'http://www.iconurl2.com',
      ranking: 1,
    }]);
  });

  test('returns a list of merchants for a different user', () => {
    const merchants = getRankingForUser('u002');
    expect(merchants).toStrictEqual([{
      display_name: 'Merchant 1',
      funny_gif_url: 'http://www.gifurl.com',
      icon_url: 'http://www.iconurl.com',
      ranking: 0.25,
    }]);
  });
});
