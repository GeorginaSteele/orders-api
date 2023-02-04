import * as Koa from "koa";

import orderRoutes from "./order/router";
import orderItemRoutes from "./ordersItem/router";

export function addRoutes(app: Koa): void {
  app.use(orderItemRoutes.routes());
  app.use(orderRoutes.routes());
}
