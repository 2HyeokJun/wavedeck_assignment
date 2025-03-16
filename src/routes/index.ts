import express from "express";
import { v1Router } from "./v1/v1Router";
import { addTempUser } from "../middlewares/authMiddleware";

export const apiRouter = express.Router();

apiRouter.use(addTempUser);
apiRouter.use("/v1", v1Router);
