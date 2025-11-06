import { model } from "@medusajs/framework/utils";

export const Brand = model.define("brand", {
  id: model.id({ prefix: "brand" }).primaryKey(),
  name: model.text(),
  is_active: model.boolean().default(false),
  metadata: model.json().nullable(),
});
