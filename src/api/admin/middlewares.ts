import { MiddlewareRoute } from "@medusajs/medusa";
import { brandsMiddlewares } from "./brands/middlewares";
import { productsMiddlewares } from "./products/middlewares";
import { cashbackMiddlewares } from "./cashbacks/middlewares";

export const adminMiddlewares: MiddlewareRoute[] = [
  ...brandsMiddlewares,
  ...cashbackMiddlewares,
  ...productsMiddlewares,
];
