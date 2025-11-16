import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteCashbackAccountsStep } from "../steps";

export type DeleteCashbackAccountsWorkflowInput = {
  ids: string[];
};

export const deleteCashbackAccountsWorkflowId = "delete-cashback-accounts";

export const deleteCashbackAccountsWorkflow = createWorkflow(
  deleteCashbackAccountsWorkflowId,
  (input: WorkflowData<DeleteCashbackAccountsWorkflowInput>) => {
    const deleted = deleteCashbackAccountsStep(input.ids);
    return new WorkflowResponse(deleted);
  },
);
