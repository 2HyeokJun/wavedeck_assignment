import express from "express";
import * as c from "../../../../controllers/stsController";
import { validateSchema } from "../../../../middlewares/validationMiddleware";
import { inferenceAudioRequestSchema } from "../../../../schemas/inferenceSchema";

export const stsRouter = express.Router();

// [POST] /api/v1/inference/sts
stsRouter.post(
  "/",
  validateSchema(inferenceAudioRequestSchema, "body"),
  c.inferenceAudio
);
