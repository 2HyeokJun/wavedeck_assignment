import { Attributes } from "sequelize";
import Audio from "../models/audio";

type insertAudioFileParams = Omit<
  Attributes<Audio>,
  "id" | "createdAt" | "updatedAt"
>;
export const insertAudioFile = async (
  data: insertAudioFileParams
): Promise<Audio> => {
  try {
    const audio = await Audio.create({
      userId: data.userId,
      fileName: data.fileName,
      filePath: data.filePath,
      fileSize: data.fileSize,
      fileType: data.fileType,
      duration: data.duration,
      metadata: data.metadata || null,
      previewFilePath: data.previewFilePath || null,
      created_at: data.now,
    });

    return audio;
  } catch (error) {
    console.error("오디오 데이터 삽입 오류:", error);
    throw error;
  }
};
