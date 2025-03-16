import { NextFunction, Request, Response } from "express";
import {
  metaDataType,
  multerFileType,
  RequestBodyType,
  RequestWithAuth,
  RequestWithFile,
  RequestWithMetadata,
} from "../types/utils";
import { BadRequestError, UnSupportedMediaTypeError } from "../utils/ApiError";
import ffmpeg from "fluent-ffmpeg";
import { AudioDeleteRequest, AudioUploadRequest } from "../types/generated";
import { deleteFile } from "./uploadMiddleware";

const checkIsAudioFile = (fileInfo: multerFileType): Boolean => {
  const AUDIO_MIMETYPE: string = "audio/";
  return fileInfo.mimetype.startsWith(AUDIO_MIMETYPE);
};

export const validateAudioType = async (
  req: RequestWithMetadata<AudioUploadRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const fileInfo = req.file as multerFileType;
  const metadata = await getAudioMetadata(fileInfo.path);
  if (!checkIsAudioFile(fileInfo)) {
    return next(new UnSupportedMediaTypeError("only audio file allowed"));
  }
  req.metadata = metadata;
  next();
};

export const validateUserInput = (
  req: RequestWithMetadata<AudioUploadRequest>,
  res: Response,
  next: NextFunction
): void => {
  const body = req.body;
  const metadata = req.metadata;
  if (!checkIsCorrectMetadata(body, metadata)) {
    const fileInfo = req.file as multerFileType;
    deleteFile(fileInfo.path);
    return next(new BadRequestError("invalid file metadata"));
  }
  next();
};

export const checkIsCorrectMetadata = (
  body: AudioUploadRequest,
  metadata: metaDataType | undefined
): Boolean => {
  if (metadata === undefined) {
    return false;
  }
  const { fileSize, duration } = body;
  const { size: mtFileSize, duration: mtDuration } = metadata.format;

  const isCorrectFileSize = fileSize === mtFileSize;
  const isCorrectDuration = duration === Math.floor(mtDuration);

  return isCorrectDuration && isCorrectFileSize;
};

export const getAudioMetadata = async (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    (ffmpeg as any).ffprobe(filePath, (err: any, metadata: any) => {
      if (err) reject(err);
      else resolve(metadata);
    });
  });
};
