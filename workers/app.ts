export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const { default: handler } = await import("../dist/_worker.js");
    return handler.fetch(request, env, ctx);
  },
};
