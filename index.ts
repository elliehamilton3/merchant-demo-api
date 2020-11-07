/* eslint-disable no-console */
import { Server, ServerRegisterPluginObject } from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import routes from './src/routes';

// eslint-disable-next-line import/prefer-default-export
export const server = new Server({
  port: 3001,
  host: 'localhost',
});

server.route(routes);

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'API Documentation',
  },
};

const plugins: Array<ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
];

const init = async () => {
  try {
    await server.register(plugins);
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (err) {
    console.log(err);
  }
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
