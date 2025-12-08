import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { StoreBrandsParamsFields } from "./validators";
import * as QueryConfig from "./query-config";

export const storeBrandMiddlewares: MiddlewareRoute[] = [
  {
    methods: ["GET"],
    matcher: "/store/brands",
    middlewares: [
      validateAndTransformQuery(
        StoreBrandsParamsFields,
        QueryConfig.listBrandConfig,
      ),
    ],
  },
];
