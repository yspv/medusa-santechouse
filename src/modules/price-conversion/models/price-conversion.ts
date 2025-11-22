import { model } from "@medusajs/framework/utils";

const PriceConversion = model.define("price_conversion", {
  id: model.id({ prefix: "pcon" }).primaryKey(),
  from: model.text(),
  to: model.text(),
  rate: model.bigNumber(),
});

export default PriceConversion;
