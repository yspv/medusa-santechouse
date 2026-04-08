import { MedusaService } from "@medusajs/framework/utils";
import { Brand, BrandImage } from "./models";

class BrandModuleService extends MedusaService({
  Brand,
  BrandImage,
}) {}

export default BrandModuleService;
