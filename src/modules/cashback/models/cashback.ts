import { model } from "@medusajs/framework/utils";
import { CashbackAmount } from "./cashback-amount";

export const Cashback = model
  .define("cashback", {
    id: model.id({ prefix: "cb" }).primaryKey(),
    variant_id: model.text().unique(),
    amounts: model.hasMany(() => CashbackAmount, { mappedBy: "cashback" }),
    is_active: model.boolean().default(false),
    metadata: model.json().nullable(),
  })
  .cascades({
    delete: ["amounts"],
  });
