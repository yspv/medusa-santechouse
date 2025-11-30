import { CreatePriceConversionDTO } from "@/types";
import {
  createStep,
  createWorkflow,
  parallelize,
  StepResponse,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createPriceConversionStep } from "../steps";
import { UpsertPriceSetDTO } from "@medusajs/framework/types";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { Price, PriceSet } from "../../../../.medusa/types/query-entry-points";

export type CreatePriceConversionWorkflowInput = {
  price_conversion: CreatePriceConversionDTO;
};

const createPriceMap = (prices: Price[]) => {
  return prices.reduce((acc, price) => {
    acc[price.currency_code!] = price;
    return acc;
  }, {});
};

const createPriceSetMap = (sets: PriceSet[]) => {
  const maped = sets.reduce<Array<[string, Record<string, Price>]>>(
    (acc, set) => {
      acc.push([set.id, createPriceMap((set.prices as Price[]) || [])]);
      return acc;
    },
    [],
  );
  return maped;
};

const upsertPriceSetsStep = createStep(
  "upsert-price-sets",
  async (data: UpsertPriceSetDTO[], { container }) => {
    const price = container.resolve("pricing");
    await price.upsertPriceSets(data);
    return new StepResponse(void 0);
  },
);

const prepareUpsertPriceSets = (data: {
  conversion: CreatePriceConversionDTO;
  priceSets: PriceSet[];
}) => {
  const { conversion, priceSets } = data;
  const priceSetMap = createPriceSetMap(priceSets);
  return priceSetMap.reduce<UpsertPriceSetDTO[]>((acc, [id, prices]) => {
    const source = prices[conversion.from];
    if (!source?.amount) return acc;
    if (prices[conversion.to]) {
      prices[conversion.to].amount = source.amount * conversion.rate;
    } else {
      prices[conversion.to] = {
        currency_code: conversion.to,
        amount: source.amount * conversion.rate,
      } as Price;
    }
    acc.push({ id, prices: Object.values(prices) });
    return acc;
  }, []);
};

export const processPriceConversionWorfklowId =
  "process-price-conversion-workflow";

export const processPriceConversionWorkflow = createWorkflow(
  processPriceConversionWorfklowId,
  (input: WorkflowData<CreatePriceConversionWorkflowInput>) => {
    const { data: priceSets } = useQueryGraphStep({
      entity: "price_set",
      fields: ["id", "prices.*"],
    });
    const priceSetUpsertInput = transform(
      { conversion: input.price_conversion, priceSets },
      prepareUpsertPriceSets,
    );
    const res = parallelize(
      createPriceConversionStep(input.price_conversion),
      upsertPriceSetsStep(priceSetUpsertInput),
    );
    const conversion = transform(res, (res) => res[0]);
    return new WorkflowResponse(conversion);
  },
);
