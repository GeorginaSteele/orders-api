import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";

import { config } from "./config";
import healthyRoutes from "./routes/healthy/router";
import { addRoutes } from "./routes";

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

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", err => {
    console.error(err);
  });

export default server;
