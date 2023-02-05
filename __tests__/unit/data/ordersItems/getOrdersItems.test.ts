const faker = require("faker");
import { Model } from "sequelize-typescript";

import { getOrdersItems } from "../../../../src/data/ordersItems/getOrdersItems";
import { OrdersItemsModel } from "../../../../src/database/models";
import { OrdersItem } from "../../../../src/types";

describe("getOrdersItems", () => {
  it("should get all items in the order", async () => {
    const testOrdersItemId: number = faker.datatype.number();
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
    const testOrderId: string = faker.random.uuid();

    jest
      .spyOn(OrdersItemsModel, "findAll")
      .mockResolvedValue([] as OrdersItemsModel[]);

    const ordersItemsResponse = await getOrdersItems(testOrderId);
    expect(ordersItemsResponse).toEqual([]);
  });
});
