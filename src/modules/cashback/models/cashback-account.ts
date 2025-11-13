import { model } from "@medusajs/framework/utils";
import { CashbackTransaction } from "./cashback-transaction";

export const CashbackAccount = model.define("cashback_account", {
  id: model.id({ prefix: "cba" }).primaryKey(),
  version: model.number().default(1),
  transactions: model.hasMany(() => CashbackTransaction, {
    mappedBy: "account",
  }),
  currency_code: model.text(),
  total_earned: model.bigNumber(),
  total_redeemed: model.bigNumber(),
  balance: model.bigNumber(),
  is_active: model.boolean().default(false),
  metadata: model.json().nullable(),
});
