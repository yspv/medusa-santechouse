import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export const AdminCashbackTransactionsParamsFields = z.object({
  account_id: z.union([z.string(), z.string().array()]).optional(),
  type: z.union([z.string(), z.string().array()]).optional(),
});

export const AdminCashbackTransactionsParams = createFindParams({
  offset: 0,
  limit: 50,
}).merge(AdminCashbackTransactionsParamsFields);
