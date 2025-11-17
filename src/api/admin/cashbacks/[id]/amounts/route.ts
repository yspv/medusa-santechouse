import {
  AdminCashbackAmountListResponse,
  AdminCashbackAmountParams,
  AdminCashbackResponse,
  AdminCreateCashbackAmount,
} from "@/types";
import { createCashbackAmountsWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
  refetchEntity,
} from "@medusajs/framework";
import {
  remapCashbackAmountResponse,
  remapCashbackResponse,
} from "../../helpers";

export const GET = async (
  req: MedusaRequest<AdminCashbackAmountParams>,
  res: MedusaResponse<AdminCashbackAmountListResponse>,
) => {
  const cashbackId = req.params.id;
  const { data: cashbackAmounts, metadata } = await refetchEntities({
    entity: "cashback_amount",
    idOrFilter: { ...req.filterableFields, cashback_id: cashbackId },
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    withDeleted: req.queryConfig.withDeleted,
  });

  res.json({
    cashback_amounts: cashbackAmounts.map((c) =>
      remapCashbackAmountResponse(c as any),
    ),
    count: metadata.count,
    limit: metadata.take,
    offset: metadata.skip,
  });
};

export const POST = async (
  req: MedusaRequest<AdminCreateCashbackAmount>,
  res: MedusaResponse<AdminCashbackResponse>,
) => {
  const cashbackId = req.params.id;
  const input = { cashback_id: cashbackId, ...req.validatedBody };
  await createCashbackAmountsWorkflow(req.scope).run({
    input: { cashback_amounts: [input] },
  });
  const cashback = await refetchEntity({
    entity: "cashback",
    idOrFilter: cashbackId,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({ cashback: remapCashbackResponse(cashback as any) });
};
