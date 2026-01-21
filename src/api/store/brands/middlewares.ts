import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { StoreBrandParams, StoreBrandsParams } from "./validators";
import * as QueryConfig from "./query-config";
import { StoreGetProductsParams } from "@medusajs/medusa/api/store/products/validators";

export const storeBrandMiddlewares: MiddlewareRoute[] = [
  {
    methods: ["GET"],
    matcher: "/store/brands",
    middlewares: [
      validateAndTransformQuery(StoreBrandsParams, QueryConfig.listBrandConfig),
    ],
  },
  {
    methods: ["GET"],
    matcher: "/store/brands/:id",
    middlewares: [
      validateAndTransformQuery(
        StoreBrandParams,
        QueryConfig.retrieveBrandConfig,
      ),
    ],
  },
  {
    methods: ["GET"],
    matcher: "/store/brands/:id/products",
    middlewares: [
      validateAndTransformQuery(
        StoreGetProductsParams,
        QueryConfig.listBrandProductsConfig,
      ),
    ],
  },
];
