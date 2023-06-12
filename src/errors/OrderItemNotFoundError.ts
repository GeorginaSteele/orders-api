import { GenericError } from "./GenericError";

export class OrderItemNotFoundError extends GenericError {
  public errorType = "ORDER_ITEM_NOT_FOUND";
  public status = 404;
  constructor(id: string) {
    super("No order item found for given identifier", { id });
  }
}
