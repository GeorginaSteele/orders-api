import * as Koa from "koa";

export function addHealthCheck(app: Koa): void {
  app.use(async (ctx, next) => {
    if (ctx.path === "/healthy") {
      try {
        ctx.body = {
          status: "healthy"
        };
        ctx.status = 200;
      } catch (err) {
        console.error(err);
        ctx.body = {
          status: "unhealthy"
        };
        ctx.status = 503;
      }
    }
  });
}
