import { CASHBACK_MODULE } from "@/modules/cashback";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type CreateCashbackAccountCustomerLinkStepInput = {
  links: {
    account_id: string;
    customer_id: string;
  }[];
};

const buildLinks = (data: CreateCashbackAccountCustomerLinkStepInput) => {
  return data.links.map((entry) => ({
    [Modules.CUSTOMER]: { customer_id: entry.customer_id },
    [CASHBACK_MODULE]: { cashback_account_id: entry.account_id },
  }));
};

export const createCashbackAccountCustomerLinkStepId =
  "create-cashback-account-customer-link";

export const createCashbackAccountCustomerLinkStep = createStep(
  createCashbackAccountCustomerLinkStepId,
  async (data: CreateCashbackAccountCustomerLinkStepInput, { container }) => {
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
