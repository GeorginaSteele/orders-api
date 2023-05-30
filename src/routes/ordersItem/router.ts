import * as Koa from "koa";
import Router from "koa-router";
import { getItem } from "../../data/item/getItem";
import { getOrder } from "../../data/order/getOrder";

import { createOrdersItem } from "../../data/ordersItem/createOrdersItem";
import { InputFormatNotSupportedError } from "../../errors";

const ordersItemRouter = new Router({ prefix: `/ordersItem` });

ordersItemRouter.post(`/:orderId`, async (ctx: Koa.Context) => {
  const { orderId } = ctx.params;

  if (!isValidateOrdersItemInputs(ctx, orderId)) {
    throw new InputFormatNotSupportedError(orderId);
  }
  const { itemId, qty, notes } = ctx.request.body;

  // check if given identifiers exist
  await getOrder(orderId);
  await getItem(itemId);

  const ordersItemId = await createOrdersItem(orderId, itemId, qty, notes);

  ctx.response.body = { orderLineId: ordersItemId };
  ctx.status = 201;
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
