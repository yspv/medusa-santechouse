import {
  MiddlewareRoute,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import {
  AdminCreateBrand,
  AdminGetBrandParams,
  AdminGetBrandsParams,
} from "./validators";
import * as QueryConfig from "./query-config";

export const brandsMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admins/brands",
    middlewares: [
      validateAndTransformQuery(
        AdminGetBrandsParams,
        QueryConfig.listBrandConfig,
      ),
    ],
  },
  {
    methods: ["POST"],
    matcher: "/admin/brands",
    middlewares: [
      validateAndTransformBody(AdminCreateBrand),
      validateAndTransformQuery(
        AdminGetBrandParams,
        QueryConfig.retrieveBrandConfig,
      ),
    ],
  },
];
