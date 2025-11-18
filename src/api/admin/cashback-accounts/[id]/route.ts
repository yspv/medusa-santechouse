import {
  AdminCashbackAccountDeleteResponse,
  AdminCashbackAccountResponse,
  AdminUpdateCashbackAccount,
} from "@/types";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackAccountResponse } from "../helpers";
import {
  deleteCashbackAccountsWorkflow,
  updateCashbackAccuontsWorkflow,
} from "@/workflows/cashback/workflows";

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<AdminCashbackAccountResponse>,
) => {
  const id = req.params.id;
  const cashbackAccount = await refetchEntity({
    entity: "cashback_accounts",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({
    cashback_account: remapCashbackAccountResponse(cashbackAccount as any),
  });
};

export const POST = async (
  req: MedusaRequest<AdminUpdateCashbackAccount>,
  res: MedusaResponse<AdminCashbackAccountResponse>,
) => {
  const id = req.params.id;
  await updateCashbackAccuontsWorkflow(req.scope).run({
    input: {
      selector: { id },
      data: req.validatedBody,
    },
  });
  const cashbackAccount = await refetchEntity({
    entity: "cashback_account",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({
    cashback_account: remapCashbackAccountResponse(cashbackAccount as any),
  });
};

export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse<AdminCashbackAccountDeleteResponse>,
) => {
  const id = req.params.id;
  await deleteCashbackAccountsWorkflow(req.scope).run({
    input: {
      ids: [id],
    },
  });
  res.json({
    id,
    object: "cashback_account",
    deleted: true,
  });
};
