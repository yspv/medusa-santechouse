import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import * as HttpTypes from "@/types/http";
import { updateBrandsWorkflow } from "@/workflows/brand/workflows";

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

export const POST = async (
  req: MedusaRequest<HttpTypes.AdminUpdateBrand>,
  res: MedusaResponse,
) => {
  const { id } = req.params;
  const query = req.scope.resolve("query");
  await updateBrandsWorkflow(req.scope).run({
    input: { selector: { id }, update: req.validatedBody },
  });
  const {
    data: [brand],
  } = await query.graph({
    entity: "brands",
    fields: req.queryConfig.fields,
    filters: { id },
  });
  res.json({ brand });
};
