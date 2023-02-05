import { GenericError } from "./GenericError";

export class ItemNotFoundError extends GenericError {
  public errorType = "ITEM_NOT_FOUND";
  public status = 404;
  constructor(id: string) {
    super("No item found for given identifier", { id });
  }
}
