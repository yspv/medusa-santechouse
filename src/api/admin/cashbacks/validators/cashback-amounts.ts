import z from "zod";

export const AdminCreateCashbackAmount = z.object({
  currency_code: z.string(),
  amount: z.number().positive(),
  metadata: z.record(z.unknown()).nullish(),
});
