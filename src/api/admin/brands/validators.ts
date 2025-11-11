import {
  createFindParams,
  createSelectParams,
} from "@medusajs/medusa/api/utils/validators";
import z from "zod";

export const AdminBrandsParamsFields = z.object({
  q: z.string().optional(),
  id: z.union([z.string(), z.array(z.string())]).optional(),
});

export const AdminGetBrandsParams = createFindParams({
  offset: 0,
  limit: 50,
}).merge(AdminBrandsParamsFields);

export const AdminGetBrandParams = createSelectParams();

export const AdminCreateBrand = z
  .object({
    name: z.string().min(1),
    is_active: z.boolean().optional(),
    metadata: z.record(z.unknown()).nullish(),
  })
  .strict();
export type AdminCreateBrand = z.infer<typeof AdminCreateBrand>;

export const AdminUpdateBrand = z
  .object({
    name: z.string().min(1).optional(),
    is_active: z.boolean().optional(),
    metadata: z.record(z.unknown()).nullish(),
  })
  .strict();

export type AdminUpdateBrand = z.infer<typeof AdminUpdateBrand>;

// Brand Products
export const AdminBrandProductsParams = createFindParams({
  offset: 0,
  limit: 50,
});
