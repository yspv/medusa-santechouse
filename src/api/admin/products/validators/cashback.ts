import z from "zod";
import { AdminCreateCashbackAmount } from "./cashback-amount";
import { createSelectParams } from "@medusajs/medusa/api/utils/validators";

export const AdminCashbackParams = createSelectParams();

export const AdminCreateCashback = z.object({
  amounts: z.array(AdminCreateCashbackAmount).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
});

export type AdminCreateCashback = z.infer<typeof AdminCreateCashback>;
