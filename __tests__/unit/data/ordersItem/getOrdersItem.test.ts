const faker = require("faker");
import { Model } from "sequelize-typescript";

import { getOrdersItem } from "../../../../src/data/ordersItem/getOrdersItem";
import { OrdersItemsModel } from "../../../../src/database/models";
import { OrdersItem } from "../../../../src/types";
import { OrderItemNotFoundError } from "../../../../src/errors";

describe("getOrdersItem", () => {
  it("should get the item if it is in the order", async () => {
    const testOrdersItemId: number = faker.datatype.number();
    const testOrderId: string = faker.datatype.uuid();
    const testItemId: string = faker.datatype.uuid();
    const testQty: number = faker.datatype.number();
    const testNotes: string = faker.datatype.string();
    const testOrdersItem: OrdersItem = {
      orderLineId: testOrdersItemId,
      orderId: testOrderId,
      itemId: testItemId,
      qty: testQty,
      notes: testNotes
    };

    jest.spyOn(OrdersItemsModel, "findOne").mockResolvedValue(({
      id: testOrdersItemId,
      order_id: testOrderId,
      item_id: testItemId,
      qty: testQty,
      notes: testNotes
    } as unknown) as Model<OrdersItemsModel>);

    const ordersItemResponse = await getOrdersItem(testOrderId, testItemId);
    expect(ordersItemResponse).toEqual(testOrdersItem);
  });

  it("should throw an error if the order item does not exist", async () => {
    const testOrderId: string = faker.random.uuid();
    const testItemId: string = faker.random.uuid();

    jest.spyOn(OrdersItemsModel, "findOne").mockResolvedValue(null);

    const ordersItemsResponse = getOrdersItem(testOrderId, testItemId);
    expect(ordersItemsResponse).rejects.toThrow(OrderItemNotFoundError);
  });
});
