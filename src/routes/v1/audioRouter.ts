import express from "express";
import * as c from "../../controllers/audioController";
import { validateSchema } from "../../middlewares/validationMiddleware";
import { uploadAudioRequestSchema } from "../../schemas/audioSchema";
import { validateAudioType } from "../../middlewares/audioMiddleware";

export const audioRouter = express.Router();

// POST /api/v1/common/upload/audio - 오디오 파일 업로드
audioRouter.post(
  "/",
  validateAudioType,
  validateSchema(uploadAudioRequestSchema, "body"),
  c.uploadAudio
);
