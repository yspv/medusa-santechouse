import {
  AdminPriceConversionListResponse,
  AdminPriceConversionParams,
} from "@/types/http/price-conversion";
import { priceConversionWorkflow } from "@/workflows/price-conversion/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
} from "@medusajs/framework";

export const GET = async (
  req: MedusaRequest<AdminPriceConversionParams>,
  res: MedusaResponse<AdminPriceConversionListResponse>,
) => {
  const { data, metadata } = await refetchEntities({
    entity: "price_conversion",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    withDeleted: req.queryConfig.withDeleted,
  });
  res.json({
    price_conversions: data,
    count: metadata.count,
    limit: metadata.take,
    offset: metadata.skip,
  });
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  await priceConversionWorkflow(req.scope).run({
    input: { price_conversion: { from: "uzs", to: "usd", rate: 0.001 } },
  });
  res.json({ status: "ok" });
};
