import { UpdateCashbackAmountDTO } from "@/types";
import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updateCashbackAmountsStep } from "../steps";

export type UpdateCashbackAmountsWorkflowInput = {
  cashback_amounts: UpdateCashbackAmountDTO[];
};

export const updateCashbackAmountsWorkflowId = "update-cashback-amounts";

export const updateCashbackAmountsWorkflow = createWorkflow(
  updateCashbackAmountsWorkflowId,
  (input: WorkflowData<UpdateCashbackAmountsWorkflowInput>) => {
    const updated = updateCashbackAmountsStep(input.cashback_amounts);
    return new WorkflowResponse(updated);
  },
);
