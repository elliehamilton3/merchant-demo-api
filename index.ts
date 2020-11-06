/* eslint-disable no-console */
import { Server } from '@hapi/hapi';
import routes from './src/routes';

// eslint-disable-next-line import/prefer-default-export
export const server = new Server({
  port: 3001,
  host: 'localhost',
});

server.route(routes);

const init = async () => {
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
