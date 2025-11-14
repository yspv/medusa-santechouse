import { CASHBACK_MODULE } from "@/modules/cashback";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type CreateCashbackVariantLinkStepInput = {
  links: {
    variant_id: string;
    cashback_id: string;
  }[];
};

const buildLinks = (data: CreateCashbackVariantLinkStepInput) => {
  return data.links.map((entry) => ({
    [Modules.PRODUCT]: { product_variant_id: entry.variant_id },
    [CASHBACK_MODULE]: { cashback_id: entry.cashback_id },
  }));
};

export const createCashbackVariantLinkStepId = "create-cashback-variant-link";

export const createCashbackVariantLinkStep = createStep(
  createCashbackVariantLinkStepId,
  async (data: CreateCashbackVariantLinkStepInput, { container }) => {
    const link = container.resolve(ContainerRegistrationKeys.LINK);
    await link.create(buildLinks(data));
    return new StepResponse(void 0, data);
  },
  async (data, { container }) => {
    if (!data?.links.length) return;
    const link = container.resolve(ContainerRegistrationKeys.LINK);
    await link.dismiss(buildLinks(data));
  },
);
