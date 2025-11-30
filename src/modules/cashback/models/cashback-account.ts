import { model } from "@medusajs/framework/utils";
import { CashbackTransaction } from "./cashback-transaction";

export const CashbackAccount = model
  .define("cashback_account", {
    id: model.id({ prefix: "cba" }).primaryKey(),
    customer_id: model.text(),
    version: model.number().default(1),
    transactions: model.hasMany(() => CashbackTransaction, {
      mappedBy: "account",
    }),
    currency_code: model.text(),
    total_earned: model.bigNumber().default(0),
    total_redeemed: model.bigNumber().default(0),
    balance: model.bigNumber().default(0),
    is_active: model.boolean().default(false),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: "IDX_cashback_account_customer_currency_unique",
      on: ["customer_id", "currency_code"],
      unique: true,
      where: "deleted_at IS NULL",
    },
  ]);
