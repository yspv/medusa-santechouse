import { CreateCashbackDTO } from "@/types";
import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createCashbacksStep } from "../steps";

export const createCashbacksWorkflowId = "create-cashbacks";
export const createCashbacksWorkflow = createWorkflow(
  createCashbacksWorkflowId,
  (input: CreateCashbackDTO[]) => {
    const created = createCashbacksStep(input);
    return new WorkflowResponse(created);
  },
);
