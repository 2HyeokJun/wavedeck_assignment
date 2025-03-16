import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger";

export interface RequestWithReqId extends Request {
  requestId?: string;
}
export const requestLogger = (
  req: RequestWithReqId,
  res: Response,
  next: NextFunction
): void => {
  const requestId = uuidv4();
  req.requestId = requestId;

  logger.info(`Request ${requestId} - ${req.method} ${req.originalUrl}`, {
    requestId,
    method: req.method,
    url: req.originalUrl,
  });

  res.on("finish", () => {
    logger.info(
      `Response ${requestId} - ${req.method} ${req.originalUrl} ${res.statusCode}`,
      {
        requestId,
        statusCode: res.statusCode,
      }
    );
  });

  next();
};
