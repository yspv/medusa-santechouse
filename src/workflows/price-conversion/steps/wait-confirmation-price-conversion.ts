import { createStep } from "@medusajs/framework/workflows-sdk";

export const waitConfirmationPriceConversionStepId =
  "wait-confirmation-price-conversion";

export const waitConfirmationPriceConversion = createStep(
  {
    name: waitConfirmationPriceConversionStepId,
    async: true,
    timeout: 60 * 60 * 1,
  },
  async () => {},
);
