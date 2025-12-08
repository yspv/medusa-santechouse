import {
  createFindParams,
  createSelectParams,
} from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export const StoreBrandParamsFields = z.object({
  id: z.string().optional(),
});

export const StoreBrandsParamsFields = z.object({
  q: z.string().optional(),
  id: z.union([z.string(), z.array(z.string())]).optional(),
});

export const StoreBrandParams = createSelectParams().merge(
  StoreBrandParamsFields,
);

export const StoreBrandsParams = createFindParams({
  offset: 0,
  limit: 50,
}).merge(StoreBrandsParamsFields);
