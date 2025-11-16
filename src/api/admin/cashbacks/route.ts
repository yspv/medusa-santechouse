import {
  AdminBrandParams,
  AdminCashbackResponse,
  AdminCreateCashback,
} from "@/types";
import { createCashbacksWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackResponse } from "./helpers";

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
