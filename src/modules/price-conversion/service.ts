import { MedusaService } from "@medusajs/framework/utils";
import PriceConversion from "./models/price-conversion";

class PriceConversionModuleService extends MedusaService({
  PriceConversion,
}) {}

export default PriceConversionModuleService;
