const faker = require("faker");
import { Context } from "koa";

import { isValidateOrdersItemInputs } from "../../../../src/routes/ordersItem/router";

describe("validateOrdersItemInputs", () => {
  const testOrderId: string = faker.datatype.uuid();
  it("should be true if the inputs are valid", () => {
    const ordersItemInputs = ({
      request: {
        body: { itemId: faker.datatype.uuid(), qty: faker.datatype.number }
      }
    } as unknown) as Context;

    expect(isValidateOrdersItemInputs(ordersItemInputs, testOrderId)).toEqual(
      true
    );
  });

  it("should be false if there is no request body", () => {
    const ordersItemInputs = ({
      request: {}
    } as unknown) as Context;

    expect(isValidateOrdersItemInputs(ordersItemInputs, testOrderId)).toEqual(
      false
    );
  });

  it("should be false if there is no itemId", () => {
    const ordersItemInputs = ({
      request: {
        body: { qty: faker.datatype.number }
      }
    } as unknown) as Context;

    expect(isValidateOrdersItemInputs(ordersItemInputs, testOrderId)).toEqual(
      false
    );
  });

  it("should be false if there is no quantity", () => {
    const ordersItemInputs = ({
      request: {
        body: { itemId: faker.datatype.uuid() }
      }
    } as unknown) as Context;

    expect(isValidateOrdersItemInputs(ordersItemInputs, testOrderId)).toEqual(
      false
    );
  });
});
