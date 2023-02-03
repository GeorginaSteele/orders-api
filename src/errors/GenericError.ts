type ErrorData = { [key: string]: any };

export abstract class GenericError extends Error {
  public abstract errorType: string;
  public abstract status: number;
  public errorData: ErrorData;
  constructor(public message: string, errorData: ErrorData) {
    super(message);
    this.errorData = errorData;
  }
}
