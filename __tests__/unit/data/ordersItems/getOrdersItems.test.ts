const faker = require("faker");
import { Model } from "sequelize-typescript";

import * as item from "../../../../src/data/item/getItem";
import { getOrdersItems } from "../../../../src/data/ordersItems/getOrdersItems";
import { OrdersItemsModel } from "../../../../src/database/models";
import { OrderDetails, OrdersItem } from "../../../../src/types";

describe("getOrdersItems", () => {
  it("should get all items in the order", async () => {
    const testOrdersItemId: string = faker.datatype.uuid();
    const testOrderId: string = faker.datatype.uuid();
    const testItemId: string = faker.datatype.uuid();
    const testQty: number = faker.datatype.number();
    const testNotes: string = faker.datatype.string;
    const testOrdersItems: OrdersItem[] = [
      {
        orderLineId: testOrdersItemId,
        orderId: testOrderId,
        itemId: testItemId,
        qty: testQty,
        notes: testNotes
      }
    ];

    jest.spyOn(OrdersItemsModel, "findAll").mockResolvedValue(([
      {
        id: testOrdersItemId,
        order_id: testOrderId,
        item_id: testItemId,
        qty: testQty,
        notes: testNotes
      }
    ] as unknown) as [Model<OrdersItemsModel>]);

    const ordersItemsResponse = await getOrdersItems(testOrderId);
    expect(ordersItemsResponse).toEqual(testOrdersItems);
  });

  it("should return an empty array if there are no items in the order", async () => {
    const testOrderId: string = "doesnotexist";

    jest
      .spyOn(OrdersItemsModel, "findAll")
      .mockResolvedValue([] as OrdersItemsModel[]);

    const ordersItemsResponse = await getOrdersItems(testOrderId);
    expect(ordersItemsResponse).toEqual([]);
  });
});
