import { Audio, AITasks } from "./audio";

export const setRelations = () => {
  Audio.hasMany(AITasks, { foreignKey: "fileId", as: "ai_tasks" });
  AITasks.belongsTo(Audio, { foreignKey: "fileId", as: "audio" });
};
