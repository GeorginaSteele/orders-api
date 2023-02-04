import { Customers, Orders, OrdersItems } from "../../database/models";
import { OrderNotFoundError } from "../../errors";
import { GenericObject, OrderDetails, OrdersItem } from "../../types";

export async function getOrder(
  orderId: string
): Promise<OrderDetails | undefined> {
  const filter: GenericObject = {
    id: orderId
  };

  const order = await Orders.findOne({
    include: [
      {
        model: OrdersItems
      },
      { model: Customers, attributes: ["email"], required: true }
    ],
    where: filter
  });

  if (!order) {
    console.log(`Could not find order for given identifier`, { orderId });
    throw new OrderNotFoundError(orderId);
  }

  const ordersItems: OrdersItem[] = order.ordersItems.map((orderItem: any) => ({
    orderLineId: orderItem.id,
    qty: orderItem.qty,
    notes: orderItem.notes
  }));

  return {
    orderId: order.id,
    status: order.status,
    email: order.customers.email,
    ordersItems
  };
}
