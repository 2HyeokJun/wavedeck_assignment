import Joi from "joi";

export const uploadAudioSchema = Joi.object({
  type: Joi.string().valid("upload", "delete").required(),
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
