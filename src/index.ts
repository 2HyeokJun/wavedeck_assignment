import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 기본 경로
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Wavedeck API 서버 테스트",
    NODE_ENV: `${process.env.NODE_ENV || "development"}`,
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`환경: ${process.env.NODE_ENV || "development"}`);
});

export default app;
