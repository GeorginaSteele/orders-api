const faker = require("faker");
import { Model } from "sequelize-typescript";

import { createOrdersItem } from "../../../../src/data/ordersItem/createOrdersItem";
import * as getOrdersItem from "../../../../src/data/ordersItem/getOrdersItem";
import { OrdersItemsModel } from "../../../../src/database/models";
import { OrderItemNotFoundError } from "../../../../src/errors";
import { OrdersItem } from "../../../../src/types";

describe("createOrdersItem", () => {
  it("should add the item to the order if it is not already part of the order", async () => {
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

    jest
      .spyOn(getOrdersItem, "getOrdersItem")
      .mockRejectedValue(new OrderItemNotFoundError(testOrderId));
    jest
      .spyOn(OrdersItemsModel, "create")
      .mockResolvedValue(({ id: testOrdersItemId } as unknown) as Model<
        OrdersItemsModel
      >);

    const ordersItemResponse = await createOrdersItem(
      testOrderId,
      testItemId,
      testQty,
      testNotes
    );

    expect(OrdersItemsModel.create).toHaveBeenCalledWith({
      order_id: testOrderId,
      item_id: testItemId,
      qty: testQty,
      notes: testNotes
    });

    expect(ordersItemResponse).toEqual(testOrdersItemId);
  });

  it("should increase the quantity of the item in the order if it is already part of the order", async () => {
    const testOrdersItemId: number = faker.datatype.number();
    const testOrderId: string = faker.datatype.uuid();
    const testItemId: string = faker.datatype.uuid();
    const inputQty: number = faker.datatype.number();
    const existingQty: number = faker.datatype.number();
    const testNotes: string = faker.datatype.string();
    const existingOrdersItem: OrdersItem = {
      orderLineId: testOrdersItemId,
      orderId: testOrderId,
      itemId: testItemId,
      qty: existingQty,
      notes: testNotes
    };

    jest
      .spyOn(getOrdersItem, "getOrdersItem")
      .mockResolvedValue(existingOrdersItem);
    jest.spyOn(OrdersItemsModel, "update").mockResolvedValue([1]);

    const ordersItemId = await createOrdersItem(
      testOrderId,
      testItemId,
      inputQty,
      testNotes
    );

    expect(OrdersItemsModel.update).toHaveBeenCalledWith(
      { qty: inputQty + existingQty },
      {
        where: {
          order_id: testOrderId,
          item_id: testItemId
        }
      }
    );

    expect(ordersItemId).toEqual(testOrdersItemId);
  });
});
