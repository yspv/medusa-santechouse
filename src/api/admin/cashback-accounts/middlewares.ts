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
    method: ["GET"],
    matcher: "/admin/cashback-accounts",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackAccountParams,
        QueryConfig.listCashbackAccountsConfig,
      ),
    ],
  },
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
  {
    method: ["GET"],
    matcher: "/admin/cashback-accounts/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackAccountParams,
        QueryConfig.retrieveCashbackAccountConfig,
      ),
    ],
  },
];
