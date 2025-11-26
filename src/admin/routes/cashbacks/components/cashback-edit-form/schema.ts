import z from "zod";

export const CashbackEditSchema = z.object({
  is_active: z.boolean().optional(),
});

export type CAshbackEditSchema = z.infer<typeof CashbackEditSchema>;
