export class ApiError extends Error {
  status;

  errors;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnautorizedError() {
    return new ApiError(401, 'User is unautorized. Sign in');
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }

  static PayloadTooLarge(message: string, errors = []) {
    return new ApiError(413, message, errors);
  }
}