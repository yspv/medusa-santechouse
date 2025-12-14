import { MiddlewareRoute } from "@medusajs/framework";
import { storeLocaleProductMiddlewares } from "./products/middlewares";

export const storeLocaleMiddlewares: MiddlewareRoute[] = [
  ...storeLocaleProductMiddlewares,
];
