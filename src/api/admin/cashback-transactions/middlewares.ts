import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  AdminCashbackTransactionParams,
  AdminCashbackTransactionsParams,
} from "./validators";
import * as QueryConfig from "./query-config";
import { AdminRedeemCashback } from "../cashbacks/validators";

export const cashbackTransactionMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/cashback-transactions",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackTransactionsParams,
        QueryConfig.listCashbackTransactionsConfig,
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/cashback-transactions/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackTransactionParams,
        QueryConfig.retrieveCashbackTransactionConfig,
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/cashback-transactions/redeem",
    middlewares: [
      validateAndTransformBody(AdminRedeemCashback),
      validateAndTransformQuery(
        AdminCashbackTransactionParams,
        QueryConfig.retrieveCashbackTransactionConfig,
      ),
    ],
  },
];
