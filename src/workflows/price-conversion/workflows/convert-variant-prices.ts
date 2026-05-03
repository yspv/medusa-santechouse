import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { UpsertPriceSetDTO } from "@medusajs/framework/types";

export type ConvertVariantPricesWorkflowInput = {
  variant_id: string;
};

const upsertVariantPriceSetStep = createStep(
  "upsert-variant-price-set",
  async (data: UpsertPriceSetDTO[], { container }) => {
    if (!data.length) return new StepResponse(void 0);
    const pricing = container.resolve("pricing");
    await pricing.upsertPriceSets(data);
    return new StepResponse(void 0);
  },
);

export const convertVariantPricesWorkflowId = "convert-variant-prices-workflow";

export const convertVariantPricesWorkflow = createWorkflow(
  convertVariantPricesWorkflowId,
  (input: WorkflowData<ConvertVariantPricesWorkflowInput>) => {
    const { data: variants } = useQueryGraphStep({
      entity: "variant",
      fields: ["id", "price_set.id", "price_set.prices.*"],
      filters: { id: input.variant_id },
    });

    const { data: conversions } = useQueryGraphStep({
      entity: "price_conversion",
      fields: ["id", "from", "to", "rate", "created_at"],
    }).config({ name: "query-price-conversions" });

    const upsertInput = transform(
      { variants, conversions },
      ({ variants, conversions }) => {
        if (!conversions.length) return [];

        // Use the latest conversion (highest created_at)
        const latest = conversions.reduce((a, b) =>
          new Date(a.created_at) > new Date(b.created_at) ? a : b,
        );

        const variant = variants[0];
        if (!variant?.price_set) return [];

        const priceSet = variant.price_set;
        const prices: Record<string, any> = {};
        const validPrices = (priceSet.prices ?? []).filter(
          (p): p is NonNullable<typeof p> => p != null,
        );
        for (const p of validPrices) {
          if (p.currency_code) prices[p.currency_code] = { ...p };
        }

        const source = prices[latest.from];
        if (source?.amount == null) return [];

        prices[latest.to] = {
          ...(prices[latest.to] ?? {}),
          currency_code: latest.to,
          amount: Math.round(source.amount * latest.rate),
        };

        return [{ id: priceSet.id, prices: Object.values(prices) }];
      },
    );

    upsertVariantPriceSetStep(upsertInput);

    return new WorkflowResponse(void 0);
  },
);
