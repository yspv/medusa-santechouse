import { MiddlewareRoute } from "@medusajs/framework";

export const customerMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/customers",
    middlewares: [
      (req, res, next) => {
        (req.allowed ??= []).push("cashback_accounts");
        next();
      },
    ],
  },
];
