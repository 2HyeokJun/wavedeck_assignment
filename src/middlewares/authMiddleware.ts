import { NextFunction, Request, Response } from "express";
import { RequestWithAuth } from "../types/utils";

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
