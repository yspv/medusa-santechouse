import { FilterablePriceConversion } from "@/types/price-conversion";
import { FindParams } from "@medusajs/framework/types";

export interface AdminPriceConversionParams
  extends FilterablePriceConversion,
    FindParams {}
