import { MiddlewareRoute } from "@medusajs/medusa";
import { brandsMiddlewares } from "./brands/middlewares";

export const adminMiddlewares: MiddlewareRoute[] = [...brandsMiddlewares];
