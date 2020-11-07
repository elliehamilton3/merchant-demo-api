import Boom from '@hapi/boom';
import { Request } from '@hapi/hapi';
import getRankingForUser from '../../businessLogic/getRankingForUser';
import Users from '../../models/Users.json';

export default async function getHandler(request: Request) {
  const { userId } = request.params;
  if (!Users.some(({ id }) => id === userId)) return Boom.notFound();

  const merchants = getRankingForUser(
    userId, request.query.start, request.query.end,
  );

  return {
    merchants,
  };
}
