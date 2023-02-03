import { Sequelize } from "sequelize-typescript";

import { config } from "../config";
import { Models } from "./models";

const connection = new Sequelize({
  dialect: "sqlite",
  ...config.database,
  logging: false,
  models: Models,
  define: {
    timestamps: false
  }
});

export default connection;
