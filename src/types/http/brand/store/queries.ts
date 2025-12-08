import { FilterableBrandProps } from "@/types/brand";
import { FindParams } from "@medusajs/types";

export interface StoreBrandParams extends FindParams, FilterableBrandProps {}
