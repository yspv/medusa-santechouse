import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteCashbackAmountsStep } from "../steps";
import { defaultAdminDetailsOrderEditFields } from "@medusajs/medusa/api/admin/order-edits/query-config";

export type DeleteCashbackAmountsWorkflowInput = {
  ids: string[];
};

export const deleteCashbackAmuontsWorkflowId = "delete-cashback-amounts";

export const deleteCashbackAmountsWorkflow = createWorkflow(
  deleteCashbackAmuontsWorkflowId,
  (input: WorkflowData<DeleteCashbackAmountsWorkflowInput>) => {
    const deleted = deleteCashbackAmountsStep(input.ids);
    return new WorkflowResponse(deleted);
  },
);
