import { CreateCashbackDTO } from "@/types";
import {
  createWorkflow,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createCashbacksStep, createCashbackVariantLinkStep } from "../steps";

export type CreateCashbackWorkflowInput = {
  cashbacks: (CreateCashbackDTO & { variant_id: string })[];
};

export const createCashbacksWorkflowId = "create-cashbacks";
export const createCashbacksWorkflow = createWorkflow(
  createCashbacksWorkflowId,
  (input: WorkflowData<CreateCashbackWorkflowInput>) => {
    const { cashbacks } = input;
    const createdCashbacks = createCashbacksStep(cashbacks);
    const cashbackAndVariantLinks = transform(
      { createdCashbacks, input },
      (data) => {
        return data.createdCashbacks.map((cashback, index) => {
          const variant_id = input.cashbacks[index].variant_id;
          const cashback_id = cashback.id;
          return { variant_id, cashback_id };
        });
      },
    );
    createCashbackVariantLinkStep({ links: cashbackAndVariantLinks });
    return new WorkflowResponse(createdCashbacks);
  },
);
