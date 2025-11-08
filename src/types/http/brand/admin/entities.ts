import { BrandDTO } from "@/types/brand";
import { AdminProduct } from "@medusajs/types";

export interface AdminBrand extends Omit<BrandDTO, "products"> {
  products?: AdminProduct[];
}
