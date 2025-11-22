import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  AdminPriceConversion,
  AdminPriceConversionParams,
  AdminPriceConversionsParams,
} from "./validators";
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
  {
    method: ["POST"],
    matcher: "/admin/price-conversions",
    middlewares: [
      validateAndTransformBody(AdminPriceConversion),
      validateAndTransformQuery(
        AdminPriceConversionParams,
        QueryConfig.retrievePriceConversionConfig,
      ),
    ],
  },
];
