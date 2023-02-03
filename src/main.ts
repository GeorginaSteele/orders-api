import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";

import { config } from "./config";
import connection from "./database/connection";
import healthyRoutes from "./routes/healthy/router";
import { addRoutes } from "./routes";
import { Server } from "http";

const app = new Koa();

const PORT = config.port;

app.use(bodyParser());
app.use(
  cors({
    origin: "*" // from anywhere for now for ease. Can make this client specific for added security
  })
);
app.use(logger());

app.use(healthyRoutes.routes()); // declaring the healthy route separately so that it's easily extensible for CICD
addRoutes(app);

let server: Server;

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    server = app.listen(PORT, async () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// To Do: use this when we move to CICD
// const stop = async (): Promise<void> => {
//   let exit = 0;
//   try {
//     await connection.close();
//   } catch (error) {
//     console.error(error);
//     exit = 1;
//   }

//   try {
//     server.close();
//   } catch (error) {
//     console.error(error);
//     exit = 1;
//   }

//   if (exit === 1) {
//     process.exit(exit);
//   }
// };

void start();

export default start;
