import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

type ServeApiOptions = {
  port: number;
};

export const serve_api = (options: ServeApiOptions) => {
  serve({
    fetch: app.fetch,
    port: options.port,
  });
};
