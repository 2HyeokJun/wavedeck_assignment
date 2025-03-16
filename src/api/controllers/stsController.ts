import { NextFunction, Request, Response } from "express";
import { RequestWithAuth } from "../types/utils";
import axios from "redaxios";
import { getUnixTImestamp } from "../dayjs";
import { selectAudioByInfo } from "../repositories/audioRepo";
import {
  AudioInferencePayload,
  AudioInferenceRequest,
} from "../types/generated";
import { BadRequestError } from "../utils/ApiError";
import {
  aiTaskStatus,
  insertAITask,
  updateAITaskStatusById,
} from "../repositories/inferenceRepo";

// AI 서버에 변환 요청을 보내고 응답을 받는 함수
const requestInferenceAudio = async (data: any): Promise<any> => {
  const MOCK_AI_SERVER: string = "http://localhost:3001/convert";

  try {
    const response = await axios.post(MOCK_AI_SERVER, data, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.data.success) {
      throw new Error(`변환 요청 실패: ${response.data.message}`);
    }
    return response.data;
  } catch (error: any) {
    const errorObject = JSON.parse(JSON.stringify(error.data));
    console.error("변환 요청 실패:", JSON.stringify(error.data));
    throw new Error(`변환 요청 실패: ${errorObject.message}`);
  }
};

// requestInferenceAudio를 최대 5초동안 계속해서 반복해서 요청하는 함수
const retryWithMaximumTimeOut = async (data: AudioInferencePayload) => {
  const TOTAL_TIMEOUT = 5000; // 전체 함수의 최대 실행 시간 5초
  // 전체 타임아웃을 설정하는 Promise
  const totalTimeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Internal Server Error"));
    }, TOTAL_TIMEOUT);
  });

  // 재시도 로직을 포함하는 Promise
  const retryPromise = (async () => {
    while (true) {
      try {
        const response = await requestInferenceAudio(data);
        console.log("변환 성공:", response);
        return response;
      } catch (error: any) {
        console.error(`변환 요청 실패:`, error.message);
      }
    }
  })();

  // 두 Promise 중 먼저 완료되는 것 반환
  return Promise.race([retryPromise, totalTimeoutPromise]);
};

// 권한이 있는 오디오를 변환 가능하는지 검증하고, 변환 요청에 따른 결과값을 반환하는 컨트롤러
export const inferenceAudio = async (
  req: RequestWithAuth<AudioInferenceRequest>,
  res: Response,
  next: NextFunction
) => {
  let taskId = 0;
  let taskStatus: aiTaskStatus = "pending";
  try {
    const { fileId, voiceId, pitch, timeOut } = req.body;
    const userId = req.auth!.userId;
    const audio = await selectAudioByInfo({
      audioId: fileId,
      userId,
    });
    if (audio === null) {
      return next(new BadRequestError("wrong file id"));
    }

    const originalPath = audio.filePath;

    taskId = (
      await insertAITask({
        fileId,
        userId,
        voiceId,
        pitch,
        status: taskStatus,
      })
    ).taskId;
    const response = await retryWithMaximumTimeOut({
      originalPath,
      pitch,
      voiceId,
      timeOut,
      taskId,
    });
    res.send(response);
  } catch (error: any) {
    console.error("error:", error.message);
    taskStatus = "failed";
    updateAITaskStatusById({ taskId, status: taskStatus });
    res.status(500).send({
      status: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      },
    });
  }
};
