import { Request } from '@hapi/hapi';
import getRankingForUser from '../../businessLogic/getRankingForUser';

export default async function getHandler(request: Request) {
  // eslint-disable-next-line no-console
  console.log(
    request.query.start.toISOString(),
    !request.query.end ? null : request.query.end.toISOString(),
  );

  // handle if returns non/error
  const merchants = getRankingForUser(request.params.userId);

  return {
    merchants,
  };
}
