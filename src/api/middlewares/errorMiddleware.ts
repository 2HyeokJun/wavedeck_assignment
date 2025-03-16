import { Request, Response, NextFunction } from "express";
import { ApiError, BadRequestError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/errorCodes";
import { logger } from "../logger";
import { RequestWithReqId } from "./loggingMiddleware";

export const errorHandler = (
  err: Error,
  req: RequestWithReqId,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error in request ${req.requestId}: ${err.message}`, {
    requestId: req.requestId,
    stack: err.stack,
  });
  if (err instanceof ApiError || err instanceof BadRequestError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details,
      },
    });
  }

  console.error("Unhandled Error:", err);
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 내부 오류가 발생했습니다",
    },
  });
};
