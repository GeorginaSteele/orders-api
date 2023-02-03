import * as Koa from "koa";
import orderRoutes from "./order/router";

export function addRoutes(app: Koa): void {
  app.use(orderRoutes.routes());
}
