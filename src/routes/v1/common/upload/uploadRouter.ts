import express from "express";
import { audioRouter } from "./audio/audioRouter";
import {
  fileUpload,
  validateFileInfo,
} from "../../../../middlewares/uploadMiddleware";

export const uploadRouter = express.Router();

uploadRouter.use(fileUpload.single("file"));
uploadRouter.use(validateFileInfo);
uploadRouter.use("/audio", audioRouter);
