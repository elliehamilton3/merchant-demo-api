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

test('should success with server connection', async () => {
  const options = {
    method: 'GET',
    url: '/',
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
  expect(data.result).toBe('Hello World!');
});
