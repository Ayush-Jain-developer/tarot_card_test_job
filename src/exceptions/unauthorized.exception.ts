class UnauthorizedExceptionError extends Error {
  message;

  statusCode;

  constructor(message: string) {
    super();
    this.message = message;
    this.statusCode = 401;
  }
}

export default UnauthorizedExceptionError;
