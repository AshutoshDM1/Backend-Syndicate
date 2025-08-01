class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string = 'Something went wrong',

    public errors: unknown[] = [],
    public date: Date = new Date(),
    public success: boolean = false,
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.date = date;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
