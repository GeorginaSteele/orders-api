import { OrdersItemsModel } from "../../database/models";
import { OrderItemNotFoundError } from "../../errors";
import { OrdersItem } from "../../types";
import { getOrdersItem } from "../ordersItem/getOrdersItem";

export async function createOrdersItem(
  orderId: string,
  itemId: string,
  qty: number,
  notes: string
): Promise<number> {
  let ordersItem: OrdersItem | null = null;
  try {
    ordersItem = await getOrdersItem(orderId, itemId);
  } catch (error) {
    if (!(error instanceof OrderItemNotFoundError)) {
      throw error;
    }
  }

  if (ordersItem) {
    const newItemQuantity: number = ordersItem.qty + qty;
    await OrdersItemsModel.update(
      { qty: newItemQuantity },
      {
        where: {
          order_id: orderId,
          item_id: itemId
        }
      }
    );

    ordersItem.qty = newItemQuantity;
  } else {
    const createdOrdersItem = await OrdersItemsModel.create({
      order_id: orderId,
      item_id: itemId,
      qty,
      notes
    });

    ordersItem = {
      orderLineId: createdOrdersItem.id,
      orderId,
      itemId,
      qty,
      notes
    };
  }

  return ordersItem.orderLineId;
}
