# Merchant User Ranking API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

1. `git clone` the repo
2. Ensure you have the prerequisites installed (see below)
3. Run `npm install`
4. Run `docker-compose up` to start up the app (see [docker-compose.yml](./docker-compose.yml) for port)
4. Run `docker-compose down` to stop all of the containers
5. Run `npm run build` if you want to compile the typescript to javascript and then you can run `npm run start`

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

Swagger docs can be found at [http://localhost:3001/documentation](http://localhost:3001/documentation) when the app is up and running. These document the available endpoints, methods, request and response data formats etc and can be used to see example request and response data.

## Built With

* [NodeJS](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Hapi including Joi and Boom](https://hapi.dev/)
* [Jest](https://jestjs.io/en/)

## CI/CD

No CI/CD has been implemented yet

## Deployment

This repo currently only exist for local development and isn't hosted anywhere yet.

## Versioning

There is no versioning in place at the moment.


## Assumptions made for development

- Building and integrating with a SQL database (I chose to hard code the data in the format in the test description and because that is how I interpreted the test description) - this was mostly to save time - it could easily be substituted out and interfaces etc added in the models folder and then seeded and queries accordingly.
- As a result of the above I did all of the filtering, sorting etc in code rather than through SQL queries, joins etc.
- Various assumptions about data types/formats both in the request/response data and in "storage" in the database (json) especially around the dates.
- I didn't work on ensure that the dates we're consistently formatted and that the timezones have been handling - this would need more time and better testing.
- I have included the start and end dates in the query params for the filtering.
- I have calculated the ranking to include the user - if there are 4 users and the user is the 2nd highest this returns as 0.75 (3 out of 4) rather than 0.667 (where the user would be excluded and it would be 2 out of 3).
- The ranking has be calculated and returned as a decimal rounded to 3 d.p. to allow for the consuming service to format it as a percentage or however else it sees fit.
- I have not included any batching of the api for x number of merchants or grouping to get multiple users at the same time.

## Possible extensions

The next steps/things I would build if I was to continue working on it are:
- Implementing some batching and adding other apis or making the current one flexible to allow for multiple users, batching or limiting the number of merchants returned, specificing particular merchants in the request, sorting of the merchants by ranking or otherwise or prioviding a range for the rankings to return e.g. over 90%.
- Implementing the SQL database, seeding and connecting it in the docker compose - this would allow for quering the database and a number of optimisations including indexing the database etc.
- In practice, I would have the SQL database and then run a number of performance and load tests with large volumes of mock (but real looking) data and test various code and SQL query combinations with a tool like [K6](https://k6.io/) or [Artillery](https://artillery.io/) in order to find the one that was the most performant for the way it was being used.
- Implement proper error handling and responses (especially around data formats and data returning null from lookups) - I would probably take the time to do this once I knew what the most performant query/code combinations were so as to minimise waste.

