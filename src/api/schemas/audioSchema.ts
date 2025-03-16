import Joi from "joi";
import { ResponseType } from "../types/utils";

export const uploadAudioRequestSchema = Joi.object({
  fileName: Joi.string().required(),
  fileSize: Joi.number()
    .integer()
    .positive()
    .max(10 * 1024 * 1024)
    .required(),
  duration: Joi.number().integer().positive().required(),
})
  .meta({ className: "AudioUploadRequest" })
  .description("오디오 파일 업로드 요청 데이터");

export const deleteAudioFileRequestSchema = uploadAudioRequestSchema
  .keys({
    audioId: Joi.number().required(),
  })
  .meta({ className: "AudioDeleteRequest" })
  .description("오디오 파일 삭제 요청 데이터");

interface uploadAudioDataSchema {
  fileId: number;
  uploadTime: string;
}

export interface uploadAudioResponseSchema extends ResponseType {
  data: uploadAudioDataSchema;
}

interface deleteAudioDataSchema {
  fileId: number;
  deleteTime: string;
}

export interface deleteAudioResponseSchema extends ResponseType {
  data: deleteAudioDataSchema;
}
