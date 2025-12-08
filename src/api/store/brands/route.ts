import { StoreBrandListResponse, StoreBrandParams } from "@/types";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
} from "@medusajs/framework";

export const GET = async (
  req: MedusaRequest<StoreBrandParams>,
  res: MedusaResponse<StoreBrandListResponse>,
) => {
  const { data, metadata } = await refetchEntities({
    entity: "brand",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
  });

  res.json({
    brands: data,
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  });
};
