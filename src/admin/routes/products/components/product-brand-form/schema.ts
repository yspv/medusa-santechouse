import z from "zod";

export const ProductBrandSchema = z.object({
  brand_id: z.string(),
});

export type ProductBrandSchema = z.infer<typeof ProductBrandSchema>;
