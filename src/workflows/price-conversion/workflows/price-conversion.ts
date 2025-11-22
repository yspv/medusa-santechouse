import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updatePriceSetsStep } from "@medusajs/medusa/core-flows";
import { createPriceConversionStep } from "../steps";
import { CreatePriceConversionDTO } from "@/types";

const getAllPrices = createStep(
  "get-all-prices",
  async (data: { currency_code: string }, { container }) => {
    const query = container.resolve("query");
    const { data: prices } = await query.graph({
      entity: "price",
      fields: ["*"],
      filters: {
        currency_code: data.currency_code,
      },
    });
    return new StepResponse(prices);
  },
);

export type PriceConversionWorkflowInput = {
  price_conversion: CreatePriceConversionDTO;
};

export const priceConversionWorkflowId = "price-conversion";
export const priceConversionWorkflow = createWorkflow(
  priceConversionWorkflowId,
  (input: WorkflowData<PriceConversionWorkflowInput>) => {
    const prices = getAllPrices({ currency_code: "usd" });
    const conversion = createPriceConversionStep(input.price_conversion);
    updatePriceSetsStep({
      price_sets: prices.map((price) => ({
        id: price.price_set_id,
        prices: [
          {
            currency_code: conversion.to,
            amount: price.amount * conversion.rate,
          },
        ],
      })),
    });
    return new WorkflowResponse(conversion);
  },
);
