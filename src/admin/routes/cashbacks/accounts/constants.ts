import z from 'zod';

export const CASHBACK_ACCOUNT_FIELDS =
  "+customer.*,+customer.cashback_accounts.*";

export const CashbackAccountEditSchema = z.object({
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish()
});

export type CashbackAccountEditSchema =
  z.infer<typeof CashbackAccountEditSchema>
