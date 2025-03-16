import { Attributes } from "sequelize";
import Audio from "../models/audio";
import { AudioDeleteRequest } from "../types/generated";

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

export const selectAudioByInfo = async (
  data: AudioDeleteRequest & { userId: number }
): Promise<Audio | null> => {
  return await Audio.findOne({
    where: {
      id: data.audioId,
      userId: data.userId,
      duration: data.duration,
      fileName: data.fileName,
      fileSize: data.fileSize,
    },
  });
};

export const deleteAudioById = async (data: number): Promise<number> => {
  return await Audio.destroy({
    where: { id: data },
  });
};
