import {
  AdminCashbackTransactionParams,
  AdminCashbackTransactionResponse,
  AdminRedeemCashback,
} from "@/types";
import { applyCashbackWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackTransactionResponse } from "../../cashback-accounts/helpers";

export const POST = async (
  req: MedusaRequest<AdminRedeemCashback, AdminCashbackTransactionParams>,
  res: MedusaResponse<AdminCashbackTransactionResponse>,
) => {
  const payload = req.validatedBody;
  const {
    result: { transaction },
  } = await applyCashbackWorkflow(req.scope).run({
    input: payload,
  });
  const result = await refetchEntity({
    entity: "cashback_transaction",
    idOrFilter: transaction.id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({
    cashback_transaction: remapCashbackTransactionResponse(result as any),
  });
};
