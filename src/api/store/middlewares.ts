import { MiddlewareRoute } from "@medusajs/framework";
import { storeBrandMiddlewares } from "./brands/middlewares";
import { storeLocaleMiddlewares } from "./[locale]/middlewares";

export const storeMiddlewares: MiddlewareRoute[] = [
  ...storeBrandMiddlewares,
  ...storeLocaleMiddlewares,
];
