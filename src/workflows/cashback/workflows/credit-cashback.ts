import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { creditCashbackStep, CreditCashbackStepInput } from "../steps";

export const creditCashbackWorkflowId = "credit-cashback";
export const creditCashbackWorkflow = createWorkflow(
  creditCashbackWorkflowId,
  (input: CreditCashbackStepInput) => {
    const credit = creditCashbackStep(input);
    return new WorkflowResponse(credit);
  },
);
