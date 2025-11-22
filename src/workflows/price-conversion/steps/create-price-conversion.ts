import { PRICE_CONVERSION_MODULE } from "@/modules/price-conversion";
import { CreatePriceConversionDTO } from "@/types";
import { Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { PriceConversion } from "../../../../.medusa/types/query-entry-points";
import {
  UpsertPriceSetDTO,
  PriceSetDTO,
  PriceDTO,
  MoneyAmountDTO,
} from "@medusajs/framework/types";

const mapPriceSet = (sets: PriceSetDTO[]) => {
  const mapPrice = (prices: MoneyAmountDTO[]) => {
    return prices.reduce((acc, price) => {
      acc[price.currency_code!] = price;
      return acc;
    }, {});
  };
  const maped = sets.reduce((acc, set) => {
    acc.set(set.id, mapPrice(set.prices || []));
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

export const createPriceConversionStepId = "price-conversion";
export const createPriceConversionStep = createStep(
  createPriceConversionStepId,
  async (data: CreatePriceConversionDTO, { container }) => {
    const service = container.resolve(PRICE_CONVERSION_MODULE);
    const price = container.resolve(Modules.PRICING);
    const priceConversion = await service.createPriceConversions(data);
    const sets = await price.listPriceSets({}, { relations: ["prices.*"] });
    const mapped = mapPriceSet(sets);
    const converted = convertPrice({
      price_sets: mapped,
      conversion: priceConversion,
    });
    await price.upsertPriceSets(converted);
    return new StepResponse(priceConversion, priceConversion.id);
  },
  async (id, { container }) => {
    if (!id) return;
    const service = container.resolve(PRICE_CONVERSION_MODULE);
    service.deletePriceConversions(id);
  },
);
