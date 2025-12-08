import { MiddlewareRoute } from "@medusajs/framework";
import { storeBrandMiddlewares } from "./brands/middlewares";

export const storeMiddlewares: MiddlewareRoute[] = [...storeBrandMiddlewares];
