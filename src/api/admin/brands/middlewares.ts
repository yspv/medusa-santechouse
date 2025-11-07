import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { AdminGetBrandsParams } from "./validators";
import * as QueryConfig from "./query-config";

export const brandsMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admins/brands",
    middlewares: [
      validateAndTransformQuery(
        AdminGetBrandsParams,
        QueryConfig.listBrandConfig,
      ),
    ],
  },
];
