import { Request, Response } from "express";
import { AudioUploadRequest } from "../types/generated";
import {
  metaDataType,
  multerFileType,
  RequestBodyType,
  RequestWithMetadata,
} from "../types/utils";
import * as db from "../repositories/audoRepo";
import { getKST } from "../dayjs";
import { uploadAudioResponseSchema } from "../schemas/audioSchema";

export const uploadAudio = async (
  req: RequestWithMetadata<AudioUploadRequest>,
  res: Response
) => {
  const { fileName, fileSize, duration } = req.body;
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
