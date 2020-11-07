# Merchant User Ranking API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

1. `git clone` the repo
2. Ensure you have the prerequisites installed (see below)
3. Run `npm install` from the root
4. Run `docker-compose up` to start up all of the apps (see [docker-compose.yml](./docker-compose.yml) for ports)
4. Run `docker-compose down` to stop all of the containers

### Prerequisites

You need to have these things installed:
- [Docker/Docker Compose](https://www.docker.com/)
- [NodeJS](https://nodejs.org/en/)

## Running the tests

- All tests are run using [Jest](https://jestjs.io/)

To run service and integration tests use:

```
npm test
```

To run only unit tests:

```
npm run test:unit
```


To run only service tests:

```
npm run test:service
```

## API Documentation

Swagger docs can be found at [http://localhost:3001/documentation](http://localhost:3001/documentation) when the app is up and running. These document the available endpoints, methods, request and response data formats etc.

## Built With

* [NodeJS](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Hapi including Joi and Boom](https://hapi.dev/)
* [Jest](https://jestjs.io/en/)

## CI/CD

- No CI/CD has been implemented

## Deployment
- This repo currently only exist for local development and isn't hosted anywhere yet.


## Versioning

We have no versioning in place at the moment.
