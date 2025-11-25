import z from "zod";

export const CreatePriceConversionSchema = z.object({
  from: z.string().nonempty(),
  to: z.string().nonempty(),
  rate: z.number(),
});

export type CreatePriceConversionSchema = z.infer<
  typeof CreatePriceConversionSchema
>;
