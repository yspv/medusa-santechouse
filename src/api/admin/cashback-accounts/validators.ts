import {
  createFindParams,
  createSelectParams,
} from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export const AdminCashbackAccountsParamsFields = z.object({
  id: z.union([z.string(), z.array(z.string())]).optional(),
  customer_id: z.union([z.string(), z.array(z.string())]).optional(),
  currency_code: z.union([z.string(), z.array(z.string())]).optional(),
  is_active: z.boolean().optional(),
});

export const AdminCashbackAccountParams = createSelectParams();
export const AdminCashbackAccountsParams = createFindParams().merge(
  AdminCashbackAccountsParamsFields,
);
export const AdminCashbackTransactionParams = createSelectParams();
export const AdminCashbackTransactionsParams = createFindParams({
  offset: 0,
  limit: 50,
});

export const AdminCreateCashbackAccount = z.object({
  customer_id: z.string(),
  currency_code: z.string(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
});

export const AdminUpdateCashbackAccount = z.object({
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
});

export const AdminAdjustmentCashbackAccountBalance = z.object({
  amount: z.number(),
});
