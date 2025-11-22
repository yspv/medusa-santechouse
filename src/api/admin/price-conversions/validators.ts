import {
  createFindParams,
  createSelectParams,
} from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export const AdminPriceConversionParams = createSelectParams();
export const AdminPriceConversionsParams = createFindParams({
  limit: 50,
  offset: 0,
});

export const AdminPriceConversion = z.object({
  from: z.string(),
  to: z.string(),
  rate: z.number(),
});
