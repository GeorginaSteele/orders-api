import { OrdersItemsModel } from '../../database/models';
import { OrdersItem } from '../../types';

export async function updateOrdersItem(
  ordersItem: OrdersItem
): Promise<void> {
  await OrdersItemsModel.update(
    { qty: ordersItem.qty, notes: ordersItem.notes },
    {
      where: {
        id: ordersItem.orderLineId,
      },
    }
  );
}
