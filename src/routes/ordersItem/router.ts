import * as Koa from 'koa';
import Router from 'koa-router';
import { getItem } from '../../data/item/getItem';
import { getOrder } from '../../data/order/getOrder';

import { createOrdersItem } from '../../data/ordersItem/createOrdersItem';
import { InputFormatNotSupportedError } from '../../errors';
import { getOrdersItem } from '../../data/ordersItem/getOrdersItem';
import { updateOrdersItem } from '../../data/ordersItem/updateOrdersItem';

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

  const orderLineId = await createOrdersItem(orderId, itemId, qty, notes);

  ctx.response.body = { orderLineId };
  ctx.status = 201;
});

ordersItemRouter.put(`/:orderId`, async (ctx: Koa.Context) => {
  const { orderId } = ctx.params;

  if (!isValidateOrdersItemInputs(ctx, orderId)) {
    throw new InputFormatNotSupportedError(orderId);
  }
  const { itemId, qty, notes } = ctx.request.body;

  // check if given identifiers exist
  await getOrder(orderId);
  const currentOrdersItem = await getOrdersItem(orderId, itemId);

  await updateOrdersItem({
    orderLineId: currentOrdersItem.orderLineId,
    itemId,
    qty,
    notes,
  });

  ctx.status = 204;
});

export function isValidateOrdersItemInputs(
  ctx: Koa.Context,
  orderId: string
): boolean {
  let isValid: boolean = true;
  if (!ctx.request.body || !ctx.request.body.itemId || !ctx.request.body.qty) {
    console.log(`Order line creation request received with incorrect inputs`, {
      orderId,
    });
    isValid = false;
  }
  return isValid;
}

export default ordersItemRouter;
