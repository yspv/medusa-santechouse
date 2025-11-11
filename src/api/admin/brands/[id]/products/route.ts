import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params;
  const query = req.scope.resolve("query");
  const { data, metadata: { take, skip, count } = {} } = await query.graph({
    entity: "product_brand",
    filters: {
      brand_id: id,
    },
    ...req.queryConfig,
  });
  res.json({
    products: data.map((d) => d.product),
    count,
    limit: take,
    offset: skip,
  });
};
