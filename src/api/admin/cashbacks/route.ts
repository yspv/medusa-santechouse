import {
  AdminBrandParams,
  AdminCashbackListResponse,
  AdminCashbackParams,
  AdminCashbackResponse,
  AdminCreateCashback,
} from "@/types";
import { createCashbacksWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackResponse } from "./helpers";

export const GET = async (
  req: MedusaRequest<AdminCashbackParams>,
  res: MedusaResponse<AdminCashbackListResponse>,
) => {
  const { data: cashbacks, metadata } = await refetchEntities({
    entity: "cashback",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    withDeleted: req.queryConfig.withDeleted,
  });

  res.json({
    cashbacks: cashbacks.map((cashback) =>
      remapCashbackResponse(cashback as any),
    ),
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  });
};

export const POST = async (
  req: MedusaRequest<AdminCreateCashback, AdminBrandParams>,
  res: MedusaResponse<AdminCashbackResponse>,
) => {
  const input = req.validatedBody;

  const { result } = await createCashbacksWorkflow(req.scope).run({
    input: { cashbacks: [input] },
  });

  const cashback = await refetchEntity({
    entity: "cashback",
    idOrFilter: result[0].id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });

  res.json({ cashback: remapCashbackResponse(cashback as any) });
};
