import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { apiRouter } from "./api/routes";
import { errorHandler } from "./api/middlewares/errorMiddleware";

export const app = express();
export const aiApp = express();
const PORT = process.env.PORT || 3000;
const aiPORT = process.env.AI_PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Wavedeck API 서버 테스트",
    NODE_ENV: `${process.env.NODE_ENV || "development"}`,
  });
});

aiApp.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Wavedeck AI 서버 테스트",
    NODE_ENV: `${process.env.NODE_ENV || "development"}`,
  });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`api 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`환경: ${process.env.NODE_ENV || "development"}`);
});
aiApp.listen(aiPORT, () => {
  console.log(`ai 서버가 포트 ${aiPORT}에서 실행 중입니다.`);
  console.log(`환경: ${process.env.NODE_ENV || "development"}`);
});
