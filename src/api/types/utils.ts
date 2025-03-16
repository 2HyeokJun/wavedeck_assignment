import { Request } from "express";

export type validateTarget = "body" | "query";
export interface RequestBodyType<T> extends Request {
  body: T;
}
export interface RequestWithAuth<T> extends RequestBodyType<T> {
  auth?: {
    userId: number;
  };
}
export interface RequestWithFile<T> extends RequestWithAuth<T> {
  file?: Express.Multer.File;
}

export interface RequestWithMetadata<T> extends RequestWithFile<T> {
  metadata?: metaDataType;
}

export interface ResponseType {
  success: boolean;
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

export type metaDataType = {
  streams: Array<{ [key: string]: any }>;
  format: ffmpegFormatType;
};

export type ffmpegFormatType = {
  filename: string;
  nb_streams: number;
  nb_programs: number;
  nb_stream_groups?: number;
  format_name: string;
  format_long_name: string;
  start_time?: number;
  duration: number;
  size: number;
  bit_rate: number;
  probe_score?: number;
  tags?: { [key: string]: string };
};
