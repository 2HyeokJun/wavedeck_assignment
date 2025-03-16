import express from "express";
import { commonRouter } from "./common/commonRouter";

export const v1Router = express.Router();

v1Router.use("/common", commonRouter);
