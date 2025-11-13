import { model } from "@medusajs/framework/utils";
import { Cashback } from "./cashback";

export const CashbackAmount = model.define("cashback_amount", {
  id: model.id({ prefix: "cbm" }).primaryKey(),
  cashback: model.belongsTo(() => Cashback, {
    mappedBy: "amounts",
  }),
  currency_code: model.text(),
  amount: model.bigNumber(),
  is_active: model.boolean().default(false),
  metadata: model.json().nullable(),
});
