import { model } from "@medusajs/framework/utils";
import { CashbackAccount } from "./cashback-account";

export enum CashbackTransactionType {
  EARNED,
  REDEEM,
  ADJUSTMENT,
}

export const CashbackTransaction = model.define("cashback_transaction", {
  id: model.id({ prefix: "cbt" }).primaryKey(),
  account: model.belongsTo(() => CashbackAccount, { mappedBy: "transactions" }),
  reference_id: model.text().nullable(),
  type: model.enum(CashbackTransactionType),
  currency_code: model.text(),
  amount: model.bigNumber(),
  metadata: model.json().nullable(),
});
