import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { StoreBrandsParams } from "./validators";
import * as QueryConfig from "./query-config";

export const storeBrandMiddlewares: MiddlewareRoute[] = [
  {
    methods: ["GET"],
    matcher: "/store/brands",
    middlewares: [
      validateAndTransformQuery(StoreBrandsParams, QueryConfig.listBrandConfig),
    ],
  },
];
