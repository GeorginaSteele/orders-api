import { OrdersItemsModel } from "../../database/models";
import { GenericObject, OrdersItem } from "../../types";

export async function getOrdersItems(orderId: string): Promise<OrdersItem[]> {
  const filter: GenericObject = {
    order_id: orderId
  };

  const ordersItems = await OrdersItemsModel.findAll({ where: filter });

  return ordersItems.map((orderItem: any) => ({
    orderLineId: orderItem.id,
    orderId: orderItem.order_id,
    itemId: orderItem.item_id,
    qty: orderItem.qty,
    notes: orderItem.notes
  }));
}
