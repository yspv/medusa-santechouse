import {
  AdminCashbackDeleteResponse,
  AdminCashbackResponse,
  AdminUpdateCashback,
} from "@/types";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackResponse } from "../helpers";
import {
  deleteCashbacksWorkflow,
  updateCashbacksWorkflow,
} from "@/workflows/cashback/workflows";

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<AdminCashbackResponse>,
) => {
  const id = req.params.id;
  const cashback = await refetchEntity({
    entity: "cashback",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });

  res.json({ cashback: remapCashbackResponse(cashback as any) });
};

export const POST = async (
  req: MedusaRequest<AdminUpdateCashback>,
  res: MedusaResponse<AdminCashbackResponse>,
) => {
  const id = req.params.id;
  const input = { id, ...req.validatedBody };
  const { result } = await updateCashbacksWorkflow(req.scope).run({
    input: { cashbacks: [input] },
  });
  const cashback = await refetchEntity({
    entity: "cashback",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({ cashback: remapCashbackResponse(cashback as any) });
};

export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse<AdminCashbackDeleteResponse>,
) => {
  const id = req.params.id;
  await deleteCashbacksWorkflow(req.scope).run({
    input: { ids: [id] },
  });
  res.json({ id, object: "cashback", deleted: true });
};
