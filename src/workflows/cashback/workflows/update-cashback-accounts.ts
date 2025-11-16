import { UpdateCashbackAccountDTO } from "@/types";
import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updateCashbackAccountsStep } from "../steps";

export type UpdateCashbackAccountsWorkflowInput = {
  cashback_accounts: UpdateCashbackAccountDTO[];
};

export const updateCashbackAccountsWorkflowId = "update-cashback-accounts";

export const updateCashbackAccuontsWorkflow = createWorkflow(
  updateCashbackAccountsWorkflowId,
  (input: WorkflowData<UpdateCashbackAccountsWorkflowInput>) => {
    const updated = updateCashbackAccountsStep(input.cashback_accounts);
    return new WorkflowResponse(updated);
  },
);
