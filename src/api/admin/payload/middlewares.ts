import { MiddlewareRoute } from "@medusajs/framework";

export const payloadMiddlewares: MiddlewareRoute[] = [
  {
    methods: ["POST"],
    matcher: "/admin/payload/sync/:collection",
    middlewares: [],
  },
];
