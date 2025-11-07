import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import * as HttpTypes from "@/types/http";

export const GET = async (
  req: MedusaRequest<HttpTypes.AdminBrandParams>,
  res: MedusaResponse,
) => {
  const query = req.scope.resolve("query");
  const { id } = req.params;
  const {
    data: [brand],
  } = await query.graph({
    entity: "brands",
    fields: req.queryConfig.fields,
    filters: { id },
  });
  res.json({ brand });
};
