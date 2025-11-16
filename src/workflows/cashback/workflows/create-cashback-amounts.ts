import { CreateCashbackAmountDTO } from "@/types";
import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createCashbackAmountsStep } from "../steps";

export type CreateCashbackAmountsWorkflowInput = {
  cashback_amounts: CreateCashbackAmountDTO[];
};

export const createCashbackAmountsWorkflowId = "create-cashback-amounts";

export const createCashbackAmountsWorkflow = createWorkflow(
  createCashbackAmountsWorkflowId,
  (input: WorkflowData<CreateCashbackAmountsWorkflowInput>) => {
    const created = createCashbackAmountsStep(input.cashback_amounts);
    return new WorkflowResponse(created);
  },
);
