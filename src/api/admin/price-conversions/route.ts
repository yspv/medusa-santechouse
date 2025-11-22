import {
  AdminPriceConversionInput,
  AdminPriceConversionListResponse,
  AdminPriceConversionParams,
  AdminPriceConversionResponse,
} from "@/types/http/price-conversion";
import { priceConversionWorkflow } from "@/workflows/price-conversion/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
  refetchEntity,
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

export const POST = async (
  req: MedusaRequest<AdminPriceConversionInput, AdminPriceConversionParams>,
  res: MedusaResponse<AdminPriceConversionResponse>,
) => {
  const payload = req.validatedBody;
  const { result } = await priceConversionWorkflow(req.scope).run({
    input: { price_conversion: payload },
  });
  const priceConversion = await refetchEntity({
    entity: "price_conversion",
    idOrFilter: result.id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({ price_conversion: priceConversion });
};
