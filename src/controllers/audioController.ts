import { NextFunction, Request, Response } from "express";
import { AudioDeleteRequest, AudioUploadRequest } from "../types/generated";
import {
  metaDataType,
  multerFileType,
  RequestBodyType,
  RequestWithAuth,
  RequestWithMetadata,
} from "../types/utils";
import * as db from "../repositories/audoRepo";
import { getKST } from "../dayjs";
import {
  deleteAudioResponseSchema,
  uploadAudioResponseSchema,
} from "../schemas/audioSchema";
import { BadRequestError, InternalServerError } from "../utils/ApiError";
import { deleteFile } from "../middlewares/uploadMiddleware";

export const uploadAudio = async (
  req: RequestWithMetadata<AudioUploadRequest>,
  res: Response
) => {
  const { fileSize, duration } = req.body;
  const fileName = (req.file as multerFileType).filename;
  const filePath = (req.file as multerFileType).path;
  const metadata = req.metadata as metaDataType;
  const fileType = metadata.format.format_name;
  const userId = req.auth?.userId;
  const insertTime = getKST();
  const result = await db.insertAudioFile({
    userId,
    fileName,
    filePath,
    fileSize,
    fileType,
    duration: duration,
    metadata,
    insertTime,
  });

  const finishTime = getKST();

  const response: uploadAudioResponseSchema = {
    success: true,
    data: {
      fileId: result.id,
      uploadTime: finishTime,
    },
  };
  res.send(response);
};

export const deleteAudio = async (
  req: RequestWithAuth<AudioDeleteRequest>,
  res: Response,
  next: NextFunction
) => {
  const userId = req.auth!.userId;
  const audioId = req.body.audioId;
  const audio = await db.selectAudioByInfo({ ...req.body, userId });
  if (audio === null) {
    return next(new BadRequestError("invalid audio id"));
  }
  const audioPath = audio.filePath;

  const deleteResult = await Promise.all([
    deleteFile(audioPath),
    db.deleteAudioById(audioId),
  ]);
  if (!deleteResult[0]) {
    return next(new InternalServerError("failed to delete files"));
  }

  if (deleteResult[1] !== 1) {
    return next(new InternalServerError("db delete failed"));
  }

  const finishTime = getKST();
  const response: deleteAudioResponseSchema = {
    success: true,
    data: {
      fileId: audioId,
      deleteTime: finishTime,
    },
  };
  res.send(response);
};
