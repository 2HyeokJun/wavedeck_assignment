import express from "express";
import { stsRouter } from "./sts/stsRouter";

export const inferenceRouter = express.Router();

inferenceRouter.use("/sts", stsRouter);
