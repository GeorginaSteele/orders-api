const faker = require("faker");
import { Model } from "sequelize-typescript";

import { updateOrdersItem } from "../../../../src/data/ordersItem/updateOrdersItem";
import { OrdersItemsModel } from "../../../../src/database/models";
import { OrdersItem } from "../../../../src/types";

describe("updateOrdersItem", () => {
  it("should update the quantity and notes of the item in the order", async () => {
    const testOrdersItemId: number = faker.datatype.number();
    const testQty: number = faker.datatype.number();
    const testNotes: string = faker.datatype.string();
    const testOrdersItem: OrdersItem = {
      orderLineId: testOrdersItemId,
      qty: testQty,
      notes: testNotes
    };
    jest.spyOn(OrdersItemsModel, "update").mockResolvedValue([1]);
    await updateOrdersItem(testOrdersItem);
    expect(OrdersItemsModel.update).toHaveBeenCalledWith(
      { qty: testQty, notes: testNotes },
      {
        where: {
          id: testOrdersItemId
        }
      }
    );
  });
});
