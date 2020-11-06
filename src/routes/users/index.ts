import Joi from 'joi';
import getHandler from './GET.handler';

export default [
  {
    method: 'GET',
    path: '/users/{userUuid}/merchant_ranking',
    options: {
      id: 'GET/users/{userUuid}/merchant_ranking',
      handler: getHandler,
      description: 'Returns an array of merchant rankings for a user',
      validate: {
        params: Joi.object({
          userUuid: Joi.string().regex(/^[. |_a-zA-Z0-9]+$/).required(),
        }),
      },
    },
  },
];
