import Joi from "joi";
import { ResponseType } from "../types/utils";

export const inferenceAudioRequestSchema = Joi.object({
  fileId: Joi.number().required(),
  voiceId: Joi.number().required(),
  pitch: Joi.number().required(),
  timeOut: Joi.number().required(),
})
  .meta({ className: "AudioInferenceRequest" })
  .description("오디오 파일 AI 변환 요청 데이터");

export const inferenceAudioPayloadSchema = Joi.object({
  originalPath: Joi.string().required(),
  voiceId: Joi.number().required(),
  pitch: Joi.number().required(),
  taskId: Joi.number().required(),
  timeOut: Joi.number().required(),
})
  .meta({ className: "AudioInferencePayload" })
  .description("오디오 파일 AI 변환 서버간 요청 데이터");

export const inferenceAudioAIServerResponseSchema = Joi.object({
  originalPath: Joi.string().required(),
  convertedPath: Joi.string().required(),
  fileSizee: Joi.number().required(),
})
  .meta({ className: "AudioInferenceAIServerResponse" })
  .description("오디오 파일 AI 변환 서버 응답 데이터");

interface inferenceAudioDataSchema {
  jobId: number;
}

export interface inferenceAudioResponseSchema extends ResponseType {
  data: inferenceAudioDataSchema;
}
