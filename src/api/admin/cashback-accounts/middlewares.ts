import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  AdminAdjustmentCashbackAccountBalance,
  AdminCashbackAccountParams,
  AdminCashbackAccountsParams,
  AdminCashbackTransactionsParams,
  AdminCreateCashbackAccount,
  AdminUpdateCashbackAccount,
} from "./validators";
import * as QueryConfig from "./query-config";

export const cashbackAccountMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/cashback-accounts",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackAccountsParams,
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
  {
    method: ["POST"],
    matcher: "/admin/cashback-accounts/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateCashbackAccount),
      validateAndTransformQuery(
        AdminCashbackAccountParams,
        QueryConfig.retrieveCashbackAccountConfig,
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/admin/cashback-accounts/:id",
    middlewares: [],
  },
  {
    method: ["GET"],
    matcher: "/admin/cashback-accounts/:id/transactions",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackTransactionsParams,
        QueryConfig.listCashbackTransactionConfig,
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/cashback-accounts/:id/adjustment",
    middlewares: [
      validateAndTransformBody(AdminAdjustmentCashbackAccountBalance),
      validateAndTransformQuery(
        AdminCashbackAccountParams,
        QueryConfig.retrieveCashbackAccountConfig,
      ),
    ],
  },
];
