const faker = require("faker");
import { Model } from "sequelize-typescript";

import { getItem } from "../../../../src/data/item/getItem";
import { Item } from "../../../../src/types";
import { ItemsModel } from "../../../../src/database/models";
import { ItemNotFoundError } from "../../../../src/errors";

describe("getItem", () => {
  it("should return the item for an existing item ID", async () => {
    const testItemId: string = faker.datatype.uuid();
    const testName: string = "chair";
    const testCost: number = faker.datatype.number();
    const testItem: Item = {
      itemId: testItemId,
      name: testName,
      cost: testCost
    };

    jest.spyOn(ItemsModel, "findOne").mockResolvedValue(({
      id: testItemId,
      name: testName,
      cost: testCost
    } as unknown) as Model<ItemsModel>);

    const itemResponse = await getItem(testItemId);

    expect(itemResponse).toEqual(testItem);
  });

  it("should throw an error if the item ID does not exist", async () => {
    const testitemId: string = "doesnotexist";
    jest.spyOn(ItemsModel, "findOne").mockResolvedValue(null);

    const itemResponse = getItem(testitemId);

    expect(itemResponse).rejects.toThrow(ItemNotFoundError);
  });
});
