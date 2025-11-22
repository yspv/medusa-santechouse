import { model } from "@medusajs/framework/utils";

const PriceConversion = model.define("price_conversion", {
  id: model.id({ prefix: "pcon" }).primaryKey(),
  from: model.text(),
  to: model.text(),
  rate: model.float(),
});

export default PriceConversion;
