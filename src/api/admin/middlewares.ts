import { MiddlewareRoute } from "@medusajs/medusa";
import { brandsMiddlewares } from "./brands/middlewares";
import { productsMiddlewares } from "./products/middlewares";

export const adminMiddlewares: MiddlewareRoute[] = [
  ...brandsMiddlewares,
  ...productsMiddlewares,
];
