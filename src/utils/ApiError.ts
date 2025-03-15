import { ERROR_CODES, HTTP_STATUS } from "../constants/errorCodes";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode: string;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    isOperational = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
    this.details = details;
  }
}

export class BadRequestError extends ApiError {
  constructor(
    message: string,
    errorCode: string = ERROR_CODES.REQUEST_VALIDATION_ERROR,
    details?: any
  ) {
    super(message, HTTP_STATUS.BAD_REQUEST, errorCode, true, details);
    this.name = "BadRequestError";
  }
}

export class PayloadTooLargeError extends ApiError {
  constructor(
    message: string,
    errorCode: string = ERROR_CODES.PAYLOAD_TOO_LARGE,
    details?: any
  ) {
    super(message, HTTP_STATUS.PAYLOAD_TOO_LARGE, errorCode, true, details);
    this.name = "PayloadTooLargeError";
  }
}

export class UnSupportedMediaTypeError extends ApiError {
  constructor(
    message: string,
    errorCode: string = ERROR_CODES.UNSUPPORTED_MEDIA_TYPE,
    details?: any
  ) {
    super(
      message,
      HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE,
      errorCode,
      true,
      details
    );
    this.name = "PayloadTooLargeError";
  }
}
