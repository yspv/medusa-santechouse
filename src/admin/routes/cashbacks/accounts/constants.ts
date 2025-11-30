import z from "zod";

export const CASHBACK_ACCOUNT_FIELDS =
  "+customer.*,+customer.cashback_accounts.*";

export const CashbackAccountEditSchema = z.object({
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
});

export type CashbackAccountEditSchema = z.infer<
  typeof CashbackAccountEditSchema
>;

export const CashbackAccountAdjustmentSchema = z.object({
  amount: z.union([z.number(), z.string()]),
});

export type CashbackAccountAdjustmentSchema = z.infer<
  typeof CashbackAccountAdjustmentSchema
>;

export const CashbackAccountCreateSchema = z.object({
  customer_id: z.string().nonempty(),
  currency_code: z.string().nonempty(),
});

export type CashbackAccountCreateSchema = z.infer<
  typeof CashbackAccountCreateSchema
>;
