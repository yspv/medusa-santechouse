import {
  createWorkflow,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { CreatePriceConversionDTO } from "@/types";
import { waitConfirmationPriceConversion } from "../steps/wait-confirmation-price-conversion";
import {
  notifyOnFailureStep,
  sendNotificationsStep,
} from "@medusajs/medusa/core-flows";
import { processPriceConversionWorkflow } from "./process-price-conversion";

export type PriceConversionWorkflowInput = {
  price_conversion: CreatePriceConversionDTO;
};

const prepareFailureNotification = () => {
  return [
    {
      to: "",
      channel: "feed",
      template: "admin-ui",
      data: {
        title: "Price conversion",
        description: `Failed to create price conversion`,
      },
    },
  ];
};

const prepareNotification = () => {
  return [
    {
      to: "",
      channel: "feed",
      template: "admin-ui",
      data: {
        title: "Price conversion",
        description: `Price conversion created successfully`,
      },
    },
  ];
};

export const priceConversionWorkflowId = "price-conversion";
export const priceConversionWorkflow = createWorkflow(
  priceConversionWorkflowId,
  (input: WorkflowData<PriceConversionWorkflowInput>) => {
    waitConfirmationPriceConversion();

    const failureNotification = transform(
      { input },
      prepareFailureNotification,
    );

    notifyOnFailureStep(failureNotification);

    processPriceConversionWorkflow
      .runAsStep({ input })
      .config({ async: true, backgroundExecution: true });

    const notifications = transform({ input }, prepareNotification);

    sendNotificationsStep(notifications);
    return new WorkflowResponse(void 0);
  },
);
