import { GenericError } from "./GenericError";

export class InputFormatNotSupportedError extends GenericError {
  public errorType = "INPUT_NOT_VALID";

  public status = 400;

  constructor(id: string) {
    super(`Input structure not supported`, { id });
  }
}
