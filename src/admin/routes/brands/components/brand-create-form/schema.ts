import { z } from "zod";

export const CreateBrandSchema = z.object({
  name: z.string().min(1),
  is_active: z.boolean().optional(),
});

export type CreateBrandSchema = z.infer<typeof CreateBrandSchema>;
