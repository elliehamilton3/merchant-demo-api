import Joi from 'joi';
import getHandler from './GET.handler';

export default [
  {
    method: 'GET',
    path: '/users/{userId}/merchant_ranking',
    options: {
      id: 'GET/users/{userId}/merchant_ranking',
      handler: getHandler,
      description: 'Returns an array of merchant rankings for a user',
      validate: {
        params: Joi.object({
          userId: Joi.string().regex(/^[. |_a-zA-Z0-9]+$/).required(),
        }),
        query: Joi.object({
          start: Joi.date().required(),
          end: Joi.date().optional(),
        }),
      },
      response: {
        schema: Joi.object({
          userId: Joi.string().required(),
          start: Joi.string().required(),
          end: Joi.string().optional().allow(null),
          merchants: Joi.array().items(Joi.object({
            display_name: Joi.string().required(),
            icon_url: Joi.string().required(),
            funny_gif_url: Joi.string().required(),
            ranking: Joi.number().required(),
          })),
        }),
      },
    },
  },
];
