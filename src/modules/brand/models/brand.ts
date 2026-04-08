import { model } from "@medusajs/framework/utils";
import BrandImage from "./brand-image";

export const Brand = model.define("brand", {
  id: model.id({ prefix: "brand" }).primaryKey(),
  name: model.text().searchable(),
  is_active: model.boolean().default(false),
  metadata: model.json().nullable(),
  images: model.hasMany(() => BrandImage, {
    foreignKey: "brand_id",
  }),
});
