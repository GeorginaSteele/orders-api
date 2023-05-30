import { OrdersItemsModel } from "../../database/models";
import { OrdersItem } from "../../types";

export async function updateOrdersItem(ordersItem: OrdersItem): Promise<number> {
  await OrdersItemsModel.update(
    { qty: ordersItem.qty, notes: ordersItem.notes },
    {
      where: {
        id: ordersItem.orderLineId
      }
    }
  );
  return ordersItem.orderLineId;
}
