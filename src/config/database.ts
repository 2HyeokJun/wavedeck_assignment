import { Sequelize } from "sequelize-typescript";
import path from "path";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SYNC } =
  process.env;

// Sequelize 인스턴스 생성
const sequelize = new Sequelize({
  dialect: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT || 13306),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  models: [path.join(__dirname, "../models/**/*.model.ts")],
  define: {
    timestamps: true,
    underscored: true,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("데이터베이스 연결 성공");

    if (DB_SYNC === "true") {
      await sequelize.sync({ alter: true });
      console.log("데이터베이스 모델 동기화 완료");
    }
  } catch (error) {
    console.error("데이터베이스 연결 실패", error);
    process.exit(1);
  }
};

connectDB();

export default sequelize;
