import { InferTypeOf } from "@medusajs/framework/types";
import PriceConversion from "./models/price-conversion";

export type PriceConversion = InferTypeOf<typeof PriceConversion>;
