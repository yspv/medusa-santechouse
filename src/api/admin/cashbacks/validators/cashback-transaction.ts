import z from "zod";

export const AdminRedeemCashback = z.object({
  order_id: z.string(),
  amount: z.number(),
});
