import {
  AdminAdjustmentCashbackAccount,
  AdminCashbackAccountResponse,
} from "@/types";
import { adjustmentCashbackAccountBalanceWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackAccountResponse } from "../../helpers";

export const POST = async (
  req: MedusaRequest<AdminAdjustmentCashbackAccount>,
  res: MedusaResponse<AdminCashbackAccountResponse>,
) => {
  const accountId = req.params.id;
  const payload = {
    account_id: accountId,
    ...req.validatedBody,
  };
  await adjustmentCashbackAccountBalanceWorkflow(req.scope).run({
    input: payload,
  });
  const cashbackAccount = await refetchEntity({
    entity: "cashback_account",
    idOrFilter: accountId,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({
    cashback_account: remapCashbackAccountResponse(cashbackAccount as any),
  });
};
