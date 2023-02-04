import * as Koa from "koa";
import Router from "koa-router";

import { createOrdersItem } from "../../data/ordersItem/createOrdersItem";
import { InputFormatNotSupportedError } from "../../errors";

const ordersItemRouter = new Router({ prefix: `/ordersItem` });

ordersItemRouter.post(`/:orderId`, async (ctx: Koa.Context) => {
  try {
    const { orderId } = ctx.params;

    if (!isValidateOrdersItemInputs(ctx, orderId)) {
      throw new InputFormatNotSupportedError(orderId);
    }
    const { itemId, qty, notes } = ctx.request.body;

    const ordersItemId = await createOrdersItem(orderId, itemId, qty, notes);

    ctx.response.body = { orderLineId: ordersItemId };
    ctx.status = 201;
  } catch (err) {
    console.error(err);
  }
});

export function isValidateOrdersItemInputs(
  ctx: Koa.Context,
  orderId: string
): boolean {
  let isValid: boolean = true;
  if (!ctx.request.body || !ctx.request.body.itemId || !ctx.request.body.qty) {
    console.log(`Order line creation request received with incorrect inputs`, {
      orderId
    });
    isValid = false;
  }
  return isValid;
}

export default ordersItemRouter;
