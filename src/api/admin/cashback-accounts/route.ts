import {
  AdminCashbackAccountListResponse,
  AdminCashbackAccountParams,
  AdminCashbackAccountResponse,
  AdminCreateCashbackAccount,
} from "@/types";
import { createCashbackAccountsWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackAccountResponse } from "./helpers";

export const GET = async (
  req: MedusaRequest<AdminCashbackAccountParams>,
  res: MedusaResponse<AdminCashbackAccountListResponse>,
) => {
  const { data, metadata } = await refetchEntities({
    entity: "cashback_account",
    idOrFilter: req.filterableFields,
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    withDeleted: req.queryConfig.withDeleted,
  });
  res.json({
    cashback_accounts: data.map((c) => remapCashbackAccountResponse(c as any)),
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  });
};

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
