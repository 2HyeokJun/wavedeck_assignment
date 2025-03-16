import express from "express";
import { audioRouter } from "./audio/audioRouter";
import {
  fileUpload,
  validateFileInfo,
} from "../../../../middlewares/uploadMiddleware";

export const uploadRouter = express.Router();

uploadRouter.post("*", fileUpload.single("file"));
uploadRouter.post("*", validateFileInfo);
uploadRouter.use("/audio", audioRouter);
