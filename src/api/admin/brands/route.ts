import { AdminBrandParams } from "@/types";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export const GET = async (
  req: MedusaRequest<AdminBrandParams>,
  res: MedusaResponse,
) => {
  const query = req.scope.resolve("query");

  const { data: brands, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: "brand",
      ...req.queryConfig,
    });

  res.json({
    brands,
    count: count!,
    limit: take!,
    offset: skip!,
  });
};
