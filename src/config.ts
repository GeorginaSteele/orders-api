interface Config {
  port: string;
  database: {
    host: string;
    username: string;
    password: string;
    database: string;
  };
}

export const config: Config = {
  port: process.env.PORT || "8080",
  database: {
    host: "localhost",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || ""
  }
};
