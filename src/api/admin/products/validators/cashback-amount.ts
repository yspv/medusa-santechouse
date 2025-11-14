import z from "zod";

export const AdminCreateCashbackAmount = z.object({
  currency_code: z.string(),
  amount: z.number(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
});

export type AdminCreateCashbackAmount = z.infer<
  typeof AdminCreateCashbackAmount
>;
