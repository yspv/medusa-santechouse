import { FilterableBrandProps } from "@/types/brand";
import { FindParams } from "@medusajs/types";

export interface AdminBrandParams extends FindParams, FilterableBrandProps {}
