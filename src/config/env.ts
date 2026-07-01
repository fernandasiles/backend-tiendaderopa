import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "3000",
  mongoUri: process.env.MONGO_URI || "",

  authJwtSecret: process.env.AUTH_JWT_SECRET || "secret123",
  authJwtTime: process.env.AUTH_JWT_TIME || "1h",
};