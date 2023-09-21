class UnauthorizedExceptionError extends Error {
  message;

  statusCode;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = 401;
  }
}

export default UnauthorizedExceptionError;
