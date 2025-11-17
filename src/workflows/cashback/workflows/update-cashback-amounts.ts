import {
  FilterableCashbackAmountProps,
  UpdateCashbackAmountDTO,
  UpsertCashbackAmountDTO,
} from "@/types";
import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updateCashbackAmountsStep } from "../steps";

export type UpdateCashbackAmountsWorkflowInput =
  | {
      selector: FilterableCashbackAmountProps;
      data: UpdateCashbackAmountDTO;
    }
  | {
      cashback_amounts: UpsertCashbackAmountDTO[];
    };

export const updateCashbackAmountsWorkflowId = "update-cashback-amounts";

export const updateCashbackAmountsWorkflow = createWorkflow(
  updateCashbackAmountsWorkflowId,
  (input: WorkflowData<UpdateCashbackAmountsWorkflowInput>) => {
    const updated = updateCashbackAmountsStep(input);
    return new WorkflowResponse(updated);
  },
);
