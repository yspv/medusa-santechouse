import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { AdminCashbackParams, AdminCreateCashback } from "./validators";
import * as QueryConfig from "./query-config";

export const cashbackMiddlewares: MiddlewareRoute[] = [
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
