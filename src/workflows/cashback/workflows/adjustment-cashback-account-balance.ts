import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  adjustmentCashbackAccountBalanceStep,
  AdjustmentCashbackAccountBalanceStepInput,
} from "../steps";

export const adjustmentCashbackAccountBalanceWorkflowId =
  "adjustment-cashback-account-balance";

export const adjustmentCashbackAccountBalanceWorkflow = createWorkflow(
  adjustmentCashbackAccountBalanceWorkflowId,
  (input: AdjustmentCashbackAccountBalanceStepInput) => {
    const result = adjustmentCashbackAccountBalanceStep(input);
    return new WorkflowResponse(result);
  },
);
