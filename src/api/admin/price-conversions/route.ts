import { priceConversionWorkflow } from "@/workflows/price-conversion/workflows";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  await priceConversionWorkflow(req.scope).run({
    input: { price_conversion: { from: "uzs", to: "usd", rate: 0.001 } },
  });
  res.json({ status: "ok" });
};
