import express from "express";
import { commonRouter } from "./common/commonRouter";
import { inferenceRouter } from "./inference/inferenceRouter";

export const v1Router = express.Router();

v1Router.use("/common", commonRouter);
v1Router.use("/inference", inferenceRouter);
