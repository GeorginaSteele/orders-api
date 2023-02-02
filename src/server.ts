import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";

import { config } from "./config";
import { addHealthCheck } from "./routes/healthcheck";
import { addRoutes } from "./routes";

const app = new Koa();

const PORT = config.port;

app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());
addHealthCheck(app); // by defining healthcheck separately, it gives you more options when moving to CICD
addRoutes(app);

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;
