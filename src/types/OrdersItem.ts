export interface OrdersItem {
  orderLineId: string;
  qty: number;
  notes: string;
  orderId?: string;
  itemId?: string;
}