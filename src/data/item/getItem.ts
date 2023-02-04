import { Items } from "../../database/models";
import { ItemNotFoundError } from "../../errors";
import { GenericObject, Item } from "../../types";

export async function getItem(itemId: string): Promise<Item> {
  const filter: GenericObject = {
    id: itemId
  };

  const item = await Items.findOne({ where: filter });

  if (!item) {
    console.log(`Could not find item for given identifier`, { itemId });
    throw new ItemNotFoundError(itemId);
  }

  return { itemId: item.id, name: item.name, cost: item.cost };
}
