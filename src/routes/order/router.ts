import { Context } from "koa";
import Router from "koa-router";

import { OrderNotFoundError } from "../../errors/OrderNotFoundError";

const orderRouter = new Router({ prefix: `/order` });

orderRouter.get(`/:orderId`, async (ctx: Context) => {
  try {
    const { orderId } = ctx.params;
    const order = null;

    // const order = await getOrder(orderId);

    if (!order) {
      throw new OrderNotFoundError(orderId);
    }

    ctx.response.body = order;
    ctx.status = 200;
  } catch (err) {
    console.error(err);
  }
});

export default orderRouter;
