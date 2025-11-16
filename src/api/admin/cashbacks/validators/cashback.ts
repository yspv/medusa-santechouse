import {
  createFindParams,
  createSelectParams,
} from "@medusajs/medusa/api/utils/validators";
import z from "zod";
import { AdminCreateCashbackAmount } from "./cashback-amounts";

export const AdminCashbackParams = createSelectParams();
export const AdminCashbacksParams = createFindParams({ offset: 0, limit: 50 });

export const AdminCreateCashback = z.object({
  variant_id: z.string(),
  amounts: z.array(AdminCreateCashbackAmount),
  metadata: z.record(z.unknown()).nullish(),
  is_active: z.boolean().optional(),
});
