import { BaseFilterable, MetadataType, ProductDTO } from "@medusajs/types";

export interface BrandDTO {
  id: string;
  name: string;
  products?: ProductDTO[];
  is_active: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at?: Date | string | null;
  metadata?: MetadataType;
}

export interface FilterableBrandProps
  extends BaseFilterable<FilterableBrandProps> {
  q?: string;
  id?: string | string[];
}

export interface CreateBrandDTO {
  name: string;
  is_active?: boolean;
}

export interface UpdateBrandDTO {
  name?: string;
  is_active?: boolean;
}

export interface UpsertBrandDTO extends UpdateBrandDTO {
  id?: string;
}
