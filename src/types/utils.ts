import { Request } from "express";

export type validateTarget = "body" | "query";
export interface RequestBodyType<T> extends Request {
  body: T;
}
export interface multerFileType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
