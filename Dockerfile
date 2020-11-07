FROM node:13 AS build

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY src/ ./src
COPY tsconfig.json ./

RUN npm run build

RUN npm ci --production

FROM alpine:3
RUN apk add nodejs --no-cache
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/
CMD node index.js