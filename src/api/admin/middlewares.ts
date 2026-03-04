import { MiddlewareRoute } from "@medusajs/medusa";
import { validateAndTransformBody } from "@medusajs/framework/http";
import { brandsMiddlewares } from "./brands/middlewares";
import { productsMiddlewares } from "./products/middlewares";
import { cashbackMiddlewares } from "./cashbacks/middlewares";
import { cashbackAccountMiddlewares } from "./cashback-accounts/middlewares";
import { priceConversionMiddlewares } from "./price-conversions/middlewares";
import { cashbackTransactionMiddlewares } from "./cashback-transactions/middlewares";
import { customerMiddlewares } from "./customers/middlewares";
import { payloadMiddlewares } from "./payload/middlewares";
import { categoryMiddlewares } from "./categories/middlewares";
import { PostInvoiceConfigSchema } from "./invoice-config/route";

export const adminMiddlewares: MiddlewareRoute[] = [
  ...brandsMiddlewares,
  ...cashbackMiddlewares,
  ...productsMiddlewares,
  ...cashbackAccountMiddlewares,
  ...priceConversionMiddlewares,
  ...cashbackTransactionMiddlewares,
  ...customerMiddlewares,
  ...payloadMiddlewares,
  ...categoryMiddlewares,
  {
    matcher: "/admin/invoice-config",
    methods: ["POST"],
    middlewares: [validateAndTransformBody(PostInvoiceConfigSchema)],
  },
];
