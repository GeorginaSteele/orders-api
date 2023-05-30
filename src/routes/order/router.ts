import { Context } from "koa";
import Router from "koa-router";
import { getOrder } from "../../data/order/getOrder";

const orderRouter = new Router({ prefix: `/order` });

orderRouter.get(`/:orderId`, async (ctx: Context) => {
  const { orderId } = ctx.params;

  const order = await getOrder(orderId);

  ctx.response.body = order;
  ctx.status = 200;
});

export default orderRouter;
