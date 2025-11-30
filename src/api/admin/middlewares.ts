import { MiddlewareRoute } from "@medusajs/medusa";
import { brandsMiddlewares } from "./brands/middlewares";
import { productsMiddlewares } from "./products/middlewares";
import { cashbackMiddlewares } from "./cashbacks/middlewares";
import { cashbackAccountMiddlewares } from "./cashback-accounts/middlewares";
import { priceConversionMiddlewares } from "./price-conversions/middlewares";
import { cashbackTransactionMiddlewares } from "./cashback-transactions/middlewares";
import { customerMiddlewares } from "./customers/middlewares";

export const adminMiddlewares: MiddlewareRoute[] = [
  ...brandsMiddlewares,
  ...cashbackMiddlewares,
  ...productsMiddlewares,
  ...cashbackAccountMiddlewares,
  ...priceConversionMiddlewares,
  ...cashbackTransactionMiddlewares,
  ...customerMiddlewares,
];
