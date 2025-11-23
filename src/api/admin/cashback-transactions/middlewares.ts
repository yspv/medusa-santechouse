import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { AdminCashbackTransactionsParams } from "./validators";
import * as QueryConfig from "./query-config";

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
];
