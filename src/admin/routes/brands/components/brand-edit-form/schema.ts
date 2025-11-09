import z from "zod";

export const BrandEditSchema = z.object({
  name: z.string().min(1),
  is_active: z.boolean().optional(),
});

export type BrandEditSchema = z.infer<typeof BrandEditSchema>;
