import {
  AdminCashbackAccountResponse,
  AdminCreateCashbackAccount,
} from "@/types";
import { createCashbackAccountsWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackAccountResponse } from "./helpers";

export const POST = async (
  req: MedusaRequest<AdminCreateCashbackAccount>,
  res: MedusaResponse<AdminCashbackAccountResponse>,
) => {
  const { result } = await createCashbackAccountsWorkflow(req.scope).run({
    input: { accounts: [req.validatedBody] },
  });
  const cashbackAccount = await refetchEntity({
    entity: "cashback_account",
    idOrFilter: result[0].id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({
    cashback_account: remapCashbackAccountResponse(cashbackAccount as any),
  });
};
