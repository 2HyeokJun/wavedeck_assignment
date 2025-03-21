import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { promises as fs } from "fs";
import { BadRequestError } from "../utils/ApiError";
import { multerFileType, validateTarget } from "../types/utils";

// req.body 또는 req.query를 통합해서 Joi의 validate를 할 수 있도록 해주는 함수
export const validateSchema =
  (schema: Joi.ObjectSchema, target: validateTarget) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validateTarget: Request = req[target as keyof Request];
    const { error, value } = schema.validate(validateTarget, {
      abortEarly: false, // 모든 에러를 한번에 반환
    });
    if (error) {
      return next(
        new BadRequestError(error.details.map((err) => err.message).join(", "))
      );
    }

    req.body = { ...value };
    next();
  };
