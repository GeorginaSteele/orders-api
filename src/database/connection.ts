import { Sequelize } from "sequelize-typescript";

import { config } from "../config";
import { Models } from "./models";

const connection = new Sequelize({
  dialect: "sqlite",
  //   ...config.database, // TODO use the config instead of the storage location
  storage:
    "/Users/georgina.steele/Documents/Interviewing/sylvera/sylvera-api/problemStatement/orders.db",
  logging: false,
  models: Models
});

export default connection;
