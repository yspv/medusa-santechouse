import { PRICE_CONVERSION_MODULE } from "@/modules/price-conversion";
import { CreatePriceConversionDTO } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const createPriceConversionStepId = "price-conversion";
export const createPriceConversionStep = createStep(
  createPriceConversionStepId,
  async (data: CreatePriceConversionDTO, { container }) => {
    const service = container.resolve(PRICE_CONVERSION_MODULE);
    const priceConversion = await service.createPriceConversions(data);
    return new StepResponse(priceConversion, priceConversion.id);
  },
  async (id, { container }) => {
    if (!id) return;
    const service = container.resolve(PRICE_CONVERSION_MODULE);
    service.deletePriceConversions(id);
  },
);
