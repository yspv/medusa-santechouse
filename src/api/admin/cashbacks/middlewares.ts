import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  AdminBatchupdateCashbackAmount,
  AdminCashbackAmountParams,
  AdminCashbackAmountsParams,
  AdminCashbackParams,
  AdminCashbacksParams,
  AdminCreateCashback,
  AdminCreateCashbackAmount,
  AdminRedeemCashback,
  AdminUpdateCashback,
  AdminUpdateCashbackAmount,
} from "./validators";
import * as QueryConfig from "./query-config";
import { createBatchBody } from "@medusajs/medusa/api/utils/validators";

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
  {
    method: ["POST"],
    matcher: "/admin/cashbacks/:id/amounts/batch",
    middlewares: [
      validateAndTransformBody(
        createBatchBody(
          AdminCreateCashbackAmount,
          AdminBatchupdateCashbackAmount,
        ),
      ),
      validateAndTransformQuery(
        AdminCashbackAmountParams,
        QueryConfig.retrieveCashbackAmountConfig,
      ),
    ],
  },
];
