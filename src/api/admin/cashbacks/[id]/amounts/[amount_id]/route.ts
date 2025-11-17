import {
  AdminCashbackAmountDeleteResponse,
  AdminCashbackAmountParams,
  AdminCashbackAmountResponse,
  AdminCashbackResponse,
  AdminUpdateCashbackAmount,
} from "@/types";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import {
  remapCashbackAmountResponse,
  remapCashbackResponse,
} from "../../../helpers";
import {
  deleteCashbackAmountsWorkflow,
  updateCashbackAmountsWorkflow,
} from "@/workflows/cashback/workflows";

export const GET = async (
  req: MedusaRequest<AdminCashbackAmountParams>,
  res: MedusaResponse<AdminCashbackAmountResponse>,
) => {
  const cashbackId = req.params.id;
  const cashbackAmountId = req.params.amount_id;
  const filter = { id: cashbackAmountId, cashback_id: cashbackId };
  const cashbackAmount = await refetchEntity({
    entity: "cashback_amount",
    idOrFilter: filter,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({
    cashback_amount: remapCashbackAmountResponse(cashbackAmount as any),
  });
};

export const POST = async (
  req: MedusaRequest<AdminUpdateCashbackAmount>,
  res: MedusaResponse<AdminCashbackResponse>,
) => {
  const cashbackId = req.params.id;
  const cashbackAmountId = req.params.amount_id;
  const filter = { id: cashbackAmountId, cashback_id: cashbackId };
  await updateCashbackAmountsWorkflow(req.scope).run({
    input: {
      selector: filter,
      data: req.validatedBody,
    },
  });
  const cashback = await refetchEntity({
    entity: "cashback",
    idOrFilter: cashbackId,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({ cashback: remapCashbackResponse(cashback as any) });
};

export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse<AdminCashbackAmountDeleteResponse>,
) => {
  const id = req.params.amount_id;
  await deleteCashbackAmountsWorkflow(req.scope).run({ input: { ids: [id] } });
  res.json({ id, object: "cashback_amount", deleted: true });
};
