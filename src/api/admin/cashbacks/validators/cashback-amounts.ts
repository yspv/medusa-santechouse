import {
  createFindParams,
  createSelectParams,
} from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export const AdminCashbackAmountParams = createSelectParams();

export const AdminCashbackAmountsParams = createFindParams({
  offset: 0,
  limit: 50,
});

export const AdminCreateCashbackAmount = z.object({
  currency_code: z.string(),
  amount: z.number().positive(),
  metadata: z.record(z.unknown()).nullish(),
});
