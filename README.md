# orders-api

This is a simple API using standard HTTP protocol that connects to a db via a transformation layer (sequelize). The purpose of the endpoint is to create, view and modify orders for a company.

## Getting started

- copy and update the contents of `.env.local.example` to your `.env` file
- install requirements by running `npm i`
- start the API by running `npm run start`

- test using `npm run test`

## Design Decisions

- Using ts-node instead of Docker for speed. If this were going to be used as production code instead of as a POC, I would advocate for Docker
- Using typescript-sequelize as the data transformation layer between the API and the db

### API Framework

- In this project we are using Koa
- Choice of API frameworks was between Express and Koa
- Whilst Express has a large community and perhaps more support, Koa has greater performance
- For a more detailed comparison, [this article](https://nodesource.com/blog/Express-Koa-Hapi/) is very useful

### Assumptions from problem statement

- `Order Line ID` corresponds to the id in the `orders_items` table in the db
- notes are optional when adding an order item line

## TO DO

- add authentication - perhaps using bearer tokens which we could use to identify which customer is using the API
- add a put endpoint for orders item to allow the customer to change the qty and notes fields
- replace `console.log` with a logger - to allow us to have different log levels
- add integration tests
- add a decorator that checks if the order ID exists (this logic will be repeated across many endpoints otherwise)
- add living documentation for the endpoints - needs to be shareable with clients and anyone working on the project
- make Insomnia project shareable - project currently exists on @Georgina's Insomnia project

### Plan for PUT /ordersItem

- endpoint URL should be `/ordersItem/:orderLineId`, where `ordersItemId` corresponds to the ID of the row in the `orders_items` table
- NOTE: `orderLineId` can be found by using the GET `/order` endpoint. It might be useful to implement a GET `/ordersItem/:orderLineId`. The underlying functionality is already created [here](./src/data/ordersItem/getOrdersItem.ts)
- body should have `qty` and/ or `notes` as inputs - need to validate datatype for both, and should have at least one
- functionality of updating the orders item can be refactored out of the createOrdersItem module [here](https://github.com/GeorginaSteele/orders-api/blob/faf135736897da118096ed564be60773e6480307/src/data/ordersItem/createOrdersItem.ts#L23)
