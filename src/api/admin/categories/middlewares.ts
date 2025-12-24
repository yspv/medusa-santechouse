import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework";
import { CreateCategoryImagesSchema } from "./[category_id]/images/route";
import {
  DeleteCategoryImagesSchema,
  UpdateCategoryImagesSchema,
} from "./[category_id]/images/batch/route";

export const categoryMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/categories/:category_id/images",
    method: ["POST"],
    middlewares: [validateAndTransformBody(CreateCategoryImagesSchema)],
  },
  {
    matcher: "/admin/categories/:category_id/images/batch",
    method: ["POST"],
    middlewares: [validateAndTransformBody(UpdateCategoryImagesSchema)],
  },
  {
    matcher: "/admin/categories/:category_id/images/batch",
    method: ["DELETE"],
    middlewares: [validateAndTransformBody(DeleteCategoryImagesSchema)],
  },
];
