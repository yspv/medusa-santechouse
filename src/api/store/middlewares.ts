import { MiddlewareRoute } from "@medusajs/framework";
import { storeBrandMiddlewares } from "./brands/middlewares";
import { storeLocaleMiddlewares } from "./[locale]/middlewares";
import { customerMiddlewares } from "./customers/middlewares";

export const storeMiddlewares: MiddlewareRoute[] = [
  ...storeBrandMiddlewares,
  ...storeLocaleMiddlewares,
  ...customerMiddlewares,
];
