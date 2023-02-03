import { OrdersItem } from "./OrderItem";

export interface OrderDetails {
  orderId: string;
  status: string; // TODO convert this to enum when we know what the statuses could be
  email: string;
  ordersItems: OrdersItem[];
}
