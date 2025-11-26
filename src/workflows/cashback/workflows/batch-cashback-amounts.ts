import {
  createWorkflow,
  parallelize,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  BatchWorkflowInput,
  BatchWorkflowOutput,
} from "@medusajs/framework/types";
import {
  CashbackAmountDTO,
  CreateCashbackAmountDTO,
  UpsertCashbackAmountDTO,
} from "@/types";
import { createCashbackAmountsWorkflow } from "./create-cashback-amounts";
import { updateCashbackAmountsWorkflow } from "./update-cashback-amounts";
import { deleteCashbackAmountsWorkflow } from "./delete-cashback-amounts";

export interface BatchCashbackAmountsWorkflowInput
  extends BatchWorkflowInput<
    CreateCashbackAmountDTO,
    UpsertCashbackAmountDTO
  > {}

export interface BatchCashbackAmountWorkflowOutput
  extends BatchWorkflowOutput<CashbackAmountDTO> {}

export const batchCashbackAmountsWorkflowId = "batch-cashback-amounts";
export const batchCashbackAmountsWorkflow = createWorkflow(
  batchCashbackAmountsWorkflowId,
  (input: WorkflowData<BatchCashbackAmountsWorkflowInput>) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        create: input.create || [],
        update: input.update || [],
        delete: input.delete || [],
      };
    });

    const res = parallelize(
      createCashbackAmountsWorkflow.runAsStep({
        input: { cashback_amounts: normalizedInput.create },
      }),
      updateCashbackAmountsWorkflow.runAsStep({
        input: { cashback_amounts: normalizedInput.update },
      }),
      deleteCashbackAmountsWorkflow.runAsStep({
        input: { ids: normalizedInput.delete },
      }),
    );

    const response = transform({ res, input }, (data) => {
      return {
        created: data[0],
        updated: data[0],
        deleted: data.input.delete ?? [],
      };
    });

    return new WorkflowResponse(response);
  },
);
