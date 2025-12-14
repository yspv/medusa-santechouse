import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  StoreLocaleProductParams,
  StoreLocaleProductsParams,
} from "./validators";
import * as QueryConfig from "./query-config";

export const storeLocaleProductMiddlewares: MiddlewareRoute[] = [
  {
    methods: ["GET"],
    matcher: "/store/:locale/products",
    middlewares: [
      validateAndTransformQuery(
        StoreLocaleProductsParams,
        QueryConfig.listLocaleProductConfig,
      ),
    ],
  },
  {
    methods: ["GET"],
    matcher: "/store/:locale/products/:id",
    middlewares: [
      validateAndTransformQuery(
        StoreLocaleProductParams,
        QueryConfig.retriveLocaleProductConfig,
      ),
    ],
  },
];
