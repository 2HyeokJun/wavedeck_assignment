import express from "express";
import * as c from "../../../../../controllers/audioController";
import { validateSchema } from "../../../../../middlewares/validationMiddleware";
import {
  deleteAudioFileRequestSchema,
  uploadAudioRequestSchema,
} from "../../../../../schemas/audioSchema";
import {
  validateAudioType,
  validateUserInput,
} from "../../../../../middlewares/audioMiddleware";

export const audioRouter = express.Router();

audioRouter.post("*", validateAudioType);
// [POST] /api/v1/common/upload/audio
audioRouter.post(
  "/",
  validateSchema(uploadAudioRequestSchema, "body"),
  validateUserInput,
  c.uploadAudio
);

// [DELETE] /api/v1/common/upload/audio
audioRouter.delete(
  "/",
  validateSchema(deleteAudioFileRequestSchema, "body"),
  c.deleteAudio
);
