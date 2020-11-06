import { Request } from '@hapi/hapi';

export default async function getHandler(request: Request) {
  console.log(request.params);
  return {
    merchants: [
      {
        display_name: 'Merchant 1',
        icon_url: 'http://www.iconurl.com',
        funny_gif_url: 'http://www.gifurl.com',
        ranking: 0.1,
      },
    ],
  };
}
