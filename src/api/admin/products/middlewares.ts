import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { AdminCreateCashback } from "./validators";
import z from "zod";
import { AdminGetProductVariantParams } from "@medusajs/medusa/api/admin/products/validators";
import { retrieveVariantConfig } from "@medusajs/medusa/api/admin/products/query-config";

export const productsMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/products/:id",
    method: ["POST"],
    additionalDataValidator: {
      brand_id: z.string().optional(),
    },
  },
  {
    matcher: "/admin/products/:id/variants/:variant_id/cashback",
    method: ["POST"],
    middlewares: [
      validateAndTransformBody(AdminCreateCashback),
      validateAndTransformQuery(
        AdminGetProductVariantParams,
        retrieveVariantConfig,
      ),
    ],
  },
];
