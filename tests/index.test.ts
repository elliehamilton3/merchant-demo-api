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

test('returns hello world on the root path', async () => {
  const options = {
    method: 'GET',
    url: '/',
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
  expect(data.result).toBe('Hello World!');
});

test('returns an array of merchants for a user', async () => {
  const options = {
    method: 'GET',
    url: '/users/001/merchant_ranking',
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
  expect(data.result).toStrictEqual({
    merchants: [{
      display_name: 'Merchant 1',
      icon_url: 'http://www.iconurl.com',
      funny_gif_url: 'http://www.gifurl.com',
      ranking: 0.1,
    }],
  });
});
