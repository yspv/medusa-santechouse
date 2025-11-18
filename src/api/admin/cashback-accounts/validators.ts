import { createSelectParams } from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export const AdminCashbackAccountParams = createSelectParams();

export const AdminCreateCashbackAccount = z.object({
  customer_id: z.string(),
  currency_code: z.string(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
});
