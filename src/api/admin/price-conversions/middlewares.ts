import {
  MiddlewareRoute,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { AdminPriceConversionsParams } from "./validators";
import * as QueryConfig from "./query-config";

export const priceConversionMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/price-conversions",
    middlewares: [
      validateAndTransformQuery(
        AdminPriceConversionsParams,
        QueryConfig.listPriceConversionsConfig,
      ),
    ],
  },
];
