import express from "express";
import { uploadRouter } from "./upload/uploadRouter";

export const commonRouter = express.Router();

commonRouter.use("/upload", uploadRouter);
