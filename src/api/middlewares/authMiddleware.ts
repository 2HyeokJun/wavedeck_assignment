import { NextFunction, Request, Response } from "express";
import { RequestWithAuth } from "../types/utils";

// 테스트용 userId를 req.auth에 전달.
export const addTempUser = (
  req: RequestWithAuth<Request>,
  res: Response,
  next: NextFunction
): void => {
  const TEMP_USER_ID: number = 1;
  req.auth = {
    userId: TEMP_USER_ID,
  };
  next();
};
