import { Request } from '@hapi/hapi';
import getRankingForUser from '../../businessLogic/getRankingForUser';

export default async function getHandler(request: Request) {
  // handle if returns non/error
  const merchants = getRankingForUser(
    request.params.userId, request.query.start, request.query.end,
  );

  return {
    merchants,
  };
}
