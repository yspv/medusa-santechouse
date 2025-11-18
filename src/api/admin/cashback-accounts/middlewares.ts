import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  AdminCashbackAccountParams,
  AdminCreateCashbackAccount,
} from "./validators";
import * as QueryConfig from "./query-config";

export const cashbackAccountMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/admin/cashback-accounts",
    middlewares: [
      validateAndTransformBody(AdminCreateCashbackAccount),
      validateAndTransformQuery(
        AdminCashbackAccountParams,
        QueryConfig.retrieveCashbackAccountConfig,
      ),
    ],
  },
];
