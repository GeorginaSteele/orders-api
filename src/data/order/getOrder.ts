import { Customers, Orders, OrdersItems } from "../../database/models";
import { OrderNotFoundError } from "../../errors/OrderNotFoundError";
import { GenericObject, OrderDetails } from "../../types";

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

  // add a map to transform to correct type

  return (order as unknown) as OrderDetails;
}
