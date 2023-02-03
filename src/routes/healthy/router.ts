import { Context } from "koa";
import Router from "koa-router";

const healthyRouter = new Router();

healthyRouter.get(`/healthy`, async (ctx: Context) => {
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
});

export default healthyRouter;
