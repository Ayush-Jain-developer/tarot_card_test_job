class NotFoundExceptionError extends Error {
  message;

  statusCode;

  constructor(message: string) {
    super();
    this.message = message;
    this.statusCode = 404;
  }
}

export default NotFoundExceptionError;
