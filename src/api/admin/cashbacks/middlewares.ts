import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  AdminCashbackAmountParams,
  AdminCashbackAmountsParams,
  AdminCashbackParams,
  AdminCashbacksParams,
  AdminCreateCashback,
  AdminCreateCashbackAmount,
  AdminUpdateCashback,
  AdminUpdateCashbackAmount,
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
  {
    method: ["GET"],
    matcher: "/admin/cashbacks/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackParams,
        QueryConfig.retrieveCashbackConfig,
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/cashbacks/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateCashback),
      validateAndTransformQuery(
        AdminCashbackParams,
        QueryConfig.retrieveCashbackConfig,
      ),
    ],
  },
  {
    methods: ["DELETE"],
    matcher: "/admin/cashbacks/:id",
    middlewares: [],
  },
  {
    method: ["GET"],
    matcher: "/admin/cashbacks/:id/amounts",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackAmountsParams,
        QueryConfig.listCashbackAmountConfig,
      ),
    ],
  },
  {
    methods: ["POST"],
    matcher: "/admin/cashbacks/:id/amounts",
    middlewares: [
      validateAndTransformBody(AdminCreateCashbackAmount),
      validateAndTransformQuery(
        AdminCashbackParams,
        QueryConfig.retrieveCashbackConfig,
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/cashbacks/:id/amounts/:amount_id",
    middlewares: [
      validateAndTransformQuery(
        AdminCashbackAmountParams,
        QueryConfig.retrieveCashbackAmountConfig,
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/cashbacks/:id/amounts/:amount_id",
    middlewares: [
      validateAndTransformBody(AdminUpdateCashbackAmount),
      validateAndTransformQuery(
        AdminCashbackParams,
        QueryConfig.retrieveCashbackConfig,
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/admin/cashbacks/:id/amounts/:amount_id",
    middlewares: [],
  },
];
