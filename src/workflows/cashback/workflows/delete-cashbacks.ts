import { CASHBACK_MODULE } from "@/modules/cashback";
import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { removeRemoteLinkStep } from "@medusajs/medusa/core-flows";
import { deleteCashbacksStep } from "../steps";

export type DeleteCashbacksWorkflowInput = {
  ids: string[];
};

export const deleteCashbacksWorkflowId = "delete-cashbacks";

export const deleteCashbacksWorkflow = createWorkflow(
  deleteCashbacksWorkflowId,
  (input: WorkflowData<DeleteCashbacksWorkflowInput>) => {
    removeRemoteLinkStep({
      [CASHBACK_MODULE]: { cashback_id: input.ids },
    }).config({ name: "remove-cashback-link-step" });

    const deleted = deleteCashbacksStep(input.ids);

    return new WorkflowResponse(deleted);
  },
);
