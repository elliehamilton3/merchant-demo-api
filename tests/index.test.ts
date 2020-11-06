import { server } from '../index';

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
      icon_url: 'http://www.iconurl.com',
      funny_gif_url: 'http://www.gifurl.com',
      ranking: 0.5,
    }],
  });
});

test('returns an array of merchants for a user with a date to in the query', async () => {
  const options = {
    method: 'GET',
    url: '/users/u001/merchant_ranking?start=01-01-2020&end=01-06-2020',
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
  expect(data.result).toStrictEqual({
    merchants: [{
      display_name: 'Merchant 1',
      icon_url: 'http://www.iconurl.com',
      funny_gif_url: 'http://www.gifurl.com',
      ranking: 0.5,
    }],
  });
});
