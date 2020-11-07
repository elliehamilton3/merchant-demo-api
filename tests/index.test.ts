import { server } from '../index';

describe('GET /users/{userId}/merchant_ranking', () => {
  beforeAll((done) => {
    server.events.on('start', () => {
      done();
    });
  });

  afterAll((done) => {
    server.events.on('stop', () => {
      done();
    });
    server.stop();
  });

  test('returns an array of merchants for a user', async () => {
    const options = {
      method: 'GET',
      url: '/users/u001/merchant_ranking?start=01-01-2020',
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
    expect(data.result).toStrictEqual({
      merchants: [{
        display_name: 'Merchant 1',
        funny_gif_url: 'http://www.gifurl.com',
        icon_url: 'http://www.iconurl.com',
        ranking: 0.5,
      }, {
        display_name: 'Merchant 2',
        funny_gif_url: 'http://www.gifurl2.com',
        icon_url: 'http://www.iconurl2.com',
        ranking: 1,
      }],
    });
  });

  test('returns an array of merchants for a user with a date to in the query', async () => {
    const options = {
      method: 'GET',
      url: '/users/u004/merchant_ranking?start=01-01-2020&end=01-06-2020',
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
    expect(data.result).toStrictEqual({
      merchants: [{
        display_name: 'Merchant 1',
        funny_gif_url: 'http://www.gifurl.com',
        icon_url: 'http://www.iconurl.com',
        ranking: 0.5,
      }],
    });
  });
});
