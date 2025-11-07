import * as HttpTypes from "@/types/http";
import { createBrandsWorkflow } from "@/workflows/brand/workflows";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export const GET = async (
  req: MedusaRequest<HttpTypes.AdminBrandParams>,
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
    count,
    limit: take,
    offset: skip,
  });
};

export const POST = async (
  req: MedusaRequest<HttpTypes.AdminCreateBrand>,
  res: MedusaResponse,
) => {
  const { result } = await createBrandsWorkflow(req.scope).run({
    input: [req.validatedBody],
  });
  res.json({ brand: result });
};
