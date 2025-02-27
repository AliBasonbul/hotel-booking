import dotenv from "dotenv";

dotenv.config(); 

export default {
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  jwtExpiration: process.env.JWT_EXPIRATION || "1h",
  port: process.env.PORT || 5000,
};
