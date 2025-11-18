import {
  FilterableCashbackAccountProps,
  UpdateCashbackAccountDTO,
  UpsertCashbackAccountDTO,
} from "@/types";
import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updateCashbackAccountsStep } from "../steps";

export type UpdateCashbackAccountsWorkflowInput =
  | {
      selector: FilterableCashbackAccountProps;
      data: UpdateCashbackAccountDTO;
    }
  | {
      cashback_accounts: UpsertCashbackAccountDTO[];
    };

export const updateCashbackAccountsWorkflowId = "update-cashback-accounts";

export const updateCashbackAccuontsWorkflow = createWorkflow(
  updateCashbackAccountsWorkflowId,
  (input: WorkflowData<UpdateCashbackAccountsWorkflowInput>) => {
    const updated = updateCashbackAccountsStep(input);
    return new WorkflowResponse(updated);
  },
);
