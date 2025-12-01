import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { AdminCashbackTransactionsParams } from "./validators";
import * as QueryConfig from "./query-config";
import { AdminCashbackTransactionParams } from "../cashback-accounts/validators";
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
