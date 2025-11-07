import { BaseFilterable, MetadataType, ProductDTO } from "@medusajs/types";

export interface BrandDTO {
  id: string;
  name: string;
  is_active: boolean;
  products?: ProductDTO[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
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
