import { defineMiddlewares } from "@medusajs/medusa";
import { adminMiddlewares } from "./admin/middlewares";

export default defineMiddlewares({
  routes: [...adminMiddlewares],
});
