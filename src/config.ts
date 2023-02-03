import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  port: string;
  database: {
    host: string;
    username: string;
    password: string;
    database: string;
    storage?: string;
  };
}

// TODO: use username, password and database variables instead of storage to make the connection more secure
export const config: Config = {
  port: process.env.PORT || "8080",
  database: {
    host: String(process.env.DB_HOST),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    storage: process.env.DB_STORAGE
  }
};
