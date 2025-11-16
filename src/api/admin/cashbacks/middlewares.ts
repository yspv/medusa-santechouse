import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  AdminCashbackParams,
  AdminCashbacksParams,
  AdminCreateCashback,
} from "./validators";
import * as QueryConfig from "./query-config";

export const cashbackMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/cashbacks",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbacksParams,
        QueryConfig.listCashbackConfig,
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/cashbacks",
    middlewares: [
      validateAndTransformBody(AdminCreateCashback),
      validateAndTransformQuery(
        AdminCashbackParams,
        QueryConfig.retrieveCashbackConfig,
      ),
    ],
  },
];
