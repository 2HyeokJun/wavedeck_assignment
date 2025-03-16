import { Attributes } from "sequelize";
import { AITasks } from "../models/audio";

type insertAITaskParams = Partial<AITasks>;
export const insertAITask = async (
  data: insertAITaskParams
): Promise<AITasks> => {
  try {
    const aiTask = await AITasks.create({
      fileId: data.fileId,
      userId: data.userId,
      voiceId: data.voiceId,
      pitch: data.pitch,
      status: data.status,
    });
    return aiTask;
  } catch (error) {
    console.error("AI 태스크 데이터 삽입 오류:", error);
    throw error;
  }
};

export type aiTaskStatus = "pending" | "processing" | "completed" | "failed";
interface updateAITaskStatusParams {
  taskId: number;
  status: aiTaskStatus;
}
export const updateAITaskStatusById = async (
  data: updateAITaskStatusParams
): Promise<number> => {
  try {
    const [affectedRows] = await AITasks.update(data, {
      where: {
        taskId: data.taskId,
      },
    });
    return affectedRows;
  } catch (error) {
    console.error("AI 태스크 데이터 업데이트 오류:", error);
    throw error;
  }
};
