import express, { Request, Response } from "express";

export const aiRouter = express.Router();

aiRouter.post("/convert", async (req: Request, res: Response) => {
  const timeout = req.body?.timeOut * 1000 || 1000;

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

  setTimeout(() => {
    res.json({
      success: true,
      ...response,
    });
  }, timeout);
});
