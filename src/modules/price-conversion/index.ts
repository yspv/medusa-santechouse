import { Module } from "@medusajs/framework/utils";
import PriceConversionModuleService from "./service";

export const PRICE_CONVERSION_MODULE = "price_conversion";

export default Module(PRICE_CONVERSION_MODULE, {
  service: PriceConversionModuleService,
});
