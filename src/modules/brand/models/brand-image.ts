import { model } from "@medusajs/framework/utils";
import { Brand } from "./brand";

const BrandImage = model.define("brand_image", {
  id: model.id().primaryKey(),
  url: model.text(),
  file_id: model.text(),
  type: model.enum(["thumbnail", "image"]),
  brand: model.belongsTo(() => Brand, {
    mappedBy: "images",
  }),
}).indexes([
  {
    on: ["brand_id", "type"],
    where: "type = 'thumbnail'",
    unique: true,
    name: "unique_thumbnail_per_brand",
  },
]);

export default BrandImage;
