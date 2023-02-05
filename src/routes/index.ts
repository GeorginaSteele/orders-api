import * as Koa from "koa";

import orderRoutes from "./order/router";
import ordersItemRoutes from "./ordersItem/router";

export function addRoutes(app: Koa): void {
  app.use(ordersItemRoutes.routes());
  app.use(orderRoutes.routes());
}
