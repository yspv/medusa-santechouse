import { BaseFilterable, MetadataType, ProductDTO } from "@medusajs/types";

export interface BrandImageDTO {
  id: string;
  url: string;
  file_id: string;
  type: "thumbnail" | "image";
  brand_id: string;
  brand?: BrandDTO;
}

export interface BrandDTO {
  id: string;
  name: string;
  handle: string;
  products?: ProductDTO[];
  images?: BrandImageDTO[];
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
  handle?: string | string[];
}

export interface CreateBrandDTO {
  name: string;
  handle: string;
  is_active?: boolean;
}

export interface UpdateBrandDTO {
  id: string;
  name?: string;
  handle?: string;
  is_active?: boolean;
}

export interface UpsertBrandDTO extends Partial<CreateBrandDTO> {
  id?: string;
}
