import express, { Request, Response } from "express";
import {
  aiTaskStatus,
  updateAITaskStatusById,
} from "../api/repositories/inferenceRepo";

export const aiRouter = express.Router();

aiRouter.post("/convert", async (req: Request, res: Response) => {
  const taskId: number = req.body!.taskId;
  const timeout = req.body?.timeOut * 1000 || 1000;
  let taskStatus: aiTaskStatus = "processing";
  interface responseType {
    data: {
      originalPath: string;
      convertedPath: string;
      fileSize: number;
    };
  }

  const response: responseType = {
    data: {
      originalPath: req.body?.originalPath,
      convertedPath: `converted/${req.body?.originalPath}`,
      fileSize: 100000,
    },
  };

  const isSuccess = Math.random() > 0.5;
  updateAITaskStatusById({
    taskId,
    status: taskStatus,
  });
  setTimeout(() => {
    if (isSuccess) {
      // 성공 응답
      taskStatus = "completed";
      updateAITaskStatusById({
        taskId,
        status: taskStatus,
      });

      res.json({
        success: true,
        ...response,
      });
    } else {
      // 500 에러 응답
      res.status(500).json({
        success: false,
        error: "서버 내부 오류가 발생했습니다",
        message: "AI 변환 처리 중 오류가 발생했습니다",
      });
    }
  }, timeout);
});
