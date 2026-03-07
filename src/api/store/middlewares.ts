import { MiddlewareRoute } from "@medusajs/framework";
import { storeBrandMiddlewares } from "./brands/middlewares";
import { customerMiddlewares } from "./customers/middlewares";

export const storeMiddlewares: MiddlewareRoute[] = [
  ...storeBrandMiddlewares,
  ...customerMiddlewares,
];
