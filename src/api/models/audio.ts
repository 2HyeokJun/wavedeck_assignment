import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Audio extends Model {
  public id!: number;
  public userId!: number;
  public fileName!: string;
  public filePath!: string;
  public fileSize!: number;
  public fileType!: string;
  public duration!: number;
  public metadata!: any;
  public previewFilePath?: string;
  public readonly createdAt!: Date;
}

Audio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "저장한 유저 id",
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "파일명",
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "원본 파일 저장 경로",
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "용량",
    },
    fileType: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "확장자명",
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "오디오 길이",
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "ffmpeg 메타데이터",
    },
    previewFilePath: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "미리보기 파일 저장 경로",
    },
  },
  {
    sequelize,
    tableName: "audios",
    timestamps: true,
  }
);

export class AITasks extends Model {
  public taskId!: number;
  public fileId!: number;
  public userId!: number;
  public voiceId!: number;
  public pitch!: number;
  public status!: "pending" | "processing" | "completed" | "failed";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AITasks.init(
  {
    taskId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pitch: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "completed", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "ai_tasks",
    timestamps: true,
  }
);
