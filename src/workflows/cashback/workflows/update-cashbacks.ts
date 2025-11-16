import { UpdateCashbackDTO } from "@/types";
import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updateCashbacksStep } from "../steps";

export type UpdateCashbacksWorkflowInput = {
  cashbacks: UpdateCashbackDTO[];
};

export const updateCashbacksWorkflowId = "update-cashbacks";

export const updateCashbacksWorkflow = createWorkflow(
  updateCashbacksWorkflowId,
  (input: WorkflowData<UpdateCashbacksWorkflowInput>) => {
    const cashbacks = updateCashbacksStep(input.cashbacks);
    return new WorkflowResponse(cashbacks);
  },
);
