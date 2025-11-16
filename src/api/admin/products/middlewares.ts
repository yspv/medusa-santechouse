import { MiddlewareRoute } from "@medusajs/framework";
import z from "zod";

export const productsMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/products/:id",
    method: ["POST"],
    additionalDataValidator: {
      brand_id: z.string().optional(),
    },
  },
];
