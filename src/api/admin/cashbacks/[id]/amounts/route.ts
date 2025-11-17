import { AdminCashbackResponse, AdminCreateCashbackAmount } from "@/types";
import { createCashbackAmountsWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackResponse } from "../../helpers";

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
