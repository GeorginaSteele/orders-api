import { OrderItem } from "./OrderItem";

export interface OrderDetails {
  id: string;
  status: string; // TODO convert this to enum when we know what the statuses could be
  email: string;
  orderItems: OrderItem[];
}
