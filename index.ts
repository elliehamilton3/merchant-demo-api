/* eslint-disable no-console */
import { Server } from '@hapi/hapi';

// eslint-disable-next-line import/prefer-default-export
export const server = new Server({
  port: 3001,
  host: 'localhost',
});

server.route({
  method: 'GET',
  path: '/',
  handler: () => 'Hello World!',
});

server.route({
  method: 'GET',
  path: '/users/001/merchant_ranking',
  handler: () => ({
    merchants: [
      {
        display_name: 'Merchant 1',
        icon_url: 'http://www.iconurl.com',
        funny_gif_url: 'http://www.gifurl.com',
        ranking: 0.1,
      },
    ],
  }),
});

const init = async () => {
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
