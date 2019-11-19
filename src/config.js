import dotenv from "dotenv";
dotenv.config();

export const API_URI =
  process.env.NODE_ENV === "development"
    ? "https://localhost:3000"
    : "https://ithakaback.now.sh/api/";
