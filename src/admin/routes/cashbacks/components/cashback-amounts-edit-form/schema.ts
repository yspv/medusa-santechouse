import z from "zod";

export const CashbackAmountsEditSchema = z.object({
  cashbacks: z.array(
    z.object({
      amounts: z.record(z.string(), z.string().or(z.number())).optional(),
    }),
  ),
});

export type CashbackAmountsEditSchema = z.infer<
  typeof CashbackAmountsEditSchema
>;
