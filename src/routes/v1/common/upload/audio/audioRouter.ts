import express from "express";
import * as c from "../../../../../controllers/audioController";
import { validateSchema } from "../../../../../middlewares/validationMiddleware";
import { uploadAudioRequestSchema } from "../../../../../schemas/audioSchema";
import {
  validateAudioType,
  validateUserInput,
} from "../../../../../middlewares/audioMiddleware";

export const audioRouter = express.Router();

audioRouter.use(validateAudioType);
// POST /api/v1/common/upload/audio
audioRouter.post(
  "/",
  validateSchema(uploadAudioRequestSchema, "body"),
  validateUserInput,
  c.uploadAudio
);

// GET /api/v1/common/upload/audio
// audioRouter.get("/", c.getAllAudios);
