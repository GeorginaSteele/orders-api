import Router from "koa-router";
const router = new Router();

router.get(`/healthy`, async ctx => {
  try {
    ctx.body = {
      status: "healthy"
    };
  } catch (err) {
    console.error(err);
  }
});

export default router;
