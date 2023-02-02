import { GenericError } from "./GenericError";

export class OrderNotFoundError extends GenericError {
  public errorType = "ORDER_NOT_FOUND";
  public status = 404;
  constructor(id: string) {
    super("No order found for given identifier", { id });
  }
}
