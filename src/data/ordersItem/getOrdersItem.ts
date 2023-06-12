import { OrdersItemsModel } from '../../database/models';
import { OrderItemNotFoundError } from '../../errors';
import { GenericObject, OrdersItem } from '../../types';

export async function getOrdersItem(
  orderId: string,
  itemId: string
): Promise<OrdersItem> {
  const filter: GenericObject = {
    order_id: orderId,
    item_id: itemId,
  };

  const ordersItem = await OrdersItemsModel.findOne({ where: filter });

  if (!ordersItem) {
    console.log(`Could not find order item for given identifiers`, { orderId });
    throw new OrderItemNotFoundError(orderId);
  }

  return {
    orderLineId: ordersItem.id,
    orderId: ordersItem.order_id,
    itemId: ordersItem.item_id,
    qty: ordersItem.qty,
    notes: ordersItem.notes,
  };
}
