import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updatePriceSetsStep } from "@medusajs/medusa/core-flows";
import { createPriceConversionStep } from "../steps";
import { CreatePriceConversionDTO } from "@/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
  Price,
  PriceConversion,
  PriceSet,
} from "../../../../.medusa/types/query-entry-points";
import { UpsertPriceSetDTO } from "@medusajs/framework/types";

const getAllPriceSets = createStep(
  "get-all-price-sets",
  async (data, { container }) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const { data: priceSets } = await query.graph({
      entity: "price_set",
      fields: ["*", "prices.*"],
    });
    return new StepResponse(priceSets);
  },
);

const mapPriceSet = (data: { price_sets: PriceSet[] }) => {
  const mapPrice = (data: { prices: Price[] }) => {
    return data.prices.reduce((acc, price) => {
      acc[price.currency_code] = price;
      return acc;
    }, {});
  };
  const maped = data.price_sets.reduce((acc, set) => {
    acc.set(set.id, mapPrice({ prices: set.prices as Price[] }));
    return acc;
  }, new Map());
  return maped;
};

const convertPrice = (data: {
  price_sets: Map<string, Record<string, any>>;
  conversion: PriceConversion;
}): UpsertPriceSetDTO[] => {
  const { from, to, rate } = data.conversion;
  console.log("Price set", data.price_sets);
  const converted = Array.from(data.price_sets).reduce((acc, [id, prices]) => {
    const sourcePrice = prices[from];
    if (!sourcePrice) return acc;
    if (prices[to]) {
      prices[to].amount = sourcePrice.amount * rate;
    } else {
      prices[to] = {
        currency_code: to,
        amount: sourcePrice.amount * rate,
      };
    }
    acc.push({ id, prices: Object.values(prices) });
    return acc;
  }, [] as UpsertPriceSetDTO[]);
  return converted;
};

export type PriceConversionWorkflowInput = {
  price_conversion: CreatePriceConversionDTO;
};

export const priceConversionWorkflowId = "price-conversion";
export const priceConversionWorkflow = createWorkflow(
  priceConversionWorkflowId,
  (input: WorkflowData<PriceConversionWorkflowInput>) => {
    const conversion = createPriceConversionStep(input.price_conversion);
    return new WorkflowResponse(conversion);
  },
);
