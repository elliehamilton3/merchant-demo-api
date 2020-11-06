import { Request } from '@hapi/hapi';

export default async function getHandler(request: Request) {
  return {
    userId: request.params.userId,
    start: request.query.dateFrom.toISOString(),
    end: !request.query.dateTo ? null : request.query.dateTo.toISOString(),
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
