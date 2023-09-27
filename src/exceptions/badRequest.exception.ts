class BadRequestExceptionError extends Error {
  message;

  statusCode;

  constructor(message: string) {
    super();
    this.message = message;
    this.statusCode = 400;
  }
}

export default BadRequestExceptionError;
