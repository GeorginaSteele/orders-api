# sylvera-api

## Getting started

- copy and update the contents of `.env.local.example` to your `.env` file
- install requirements by running `npm i`
- start the API by running `npm run start`

## Design Requirements

- security
- testing
- endpoint documentation (particularly as it will be used by a client)

- would be good to have an abstraction layer on top of db

## Design Decisions

- Using ts-node instead of Docker for speed. If this were going to be used as production code instead of as a POC, I would advocate for Docker

### Assumptions

- `Order Line ID` corresponds to the id in the `orders_items` table in the db

### API Framework

- In this project we are using Koa
  TODO: ADD MORE REASONING HERE!!! - [Useful explanation of the options](https://nodesource.com/blog/Express-Koa-Hapi/)

## TO DO

- replace `console.log` with a logger - when this isn't on local machines, we want to be able to hook the logging up to an observability service (like datadog)
