import { waitConfirmationPriceConversionStepId } from "@/workflows/price-conversion/steps";
import { priceConversionWorkflowId } from "@/workflows/price-conversion/workflows";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules, TransactionHandlerType } from "@medusajs/framework/utils";
import { StepResponse } from "@medusajs/framework/workflows-sdk";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const transactionId = req.params.transaction_id;
  const workflowEngineService = req.scope.resolve(Modules.WORKFLOW_ENGINE);
  await workflowEngineService.setStepSuccess({
    idempotencyKey: {
      action: TransactionHandlerType.INVOKE,
      transactionId,
      stepId: waitConfirmationPriceConversionStepId,
      workflowId: priceConversionWorkflowId,
    },
    stepResponse: new StepResponse(true),
  });
  res.status(202).json({});
};
