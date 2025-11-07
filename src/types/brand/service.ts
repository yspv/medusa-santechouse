import {
  Context,
  FindConfig,
  IModuleService,
  RestoreReturn,
  SoftDeleteReturn,
} from "@medusajs/types";
import {
  BrandDTO,
  CreateBrandDTO,
  FilterableBrandProps,
  UpdateBrandDTO,
} from "./common";

export interface IBrandModuleService extends IModuleService {
  retrieveBrand(
    id: string,
    config?: FindConfig<BrandDTO>,
    sharedContext?: Context,
  ): Promise<BrandDTO>;

  listBrands(
    filters?: FilterableBrandProps,
    config?: FindConfig<BrandDTO>,
    sharedContext?: Context,
  ): Promise<BrandDTO[]>;

  listAndCountBrands(
    filters?: FilterableBrandProps,
    config?: FindConfig<BrandDTO>,
    sharedContext?: Context,
  ): Promise<[BrandDTO[], number]>;

  createBrands(
    data: CreateBrandDTO[],
    sharedContext?: Context,
  ): Promise<BrandDTO[]>;

  createBrands(
    data: CreateBrandDTO,
    sharedContext?: Context,
  ): Promise<BrandDTO>;

  updateBrands(
    id: string,
    data: UpdateBrandDTO,
    sharedContext?: Context,
  ): Promise<BrandDTO>;

  updateBrands(
    selector: FilterableBrandProps,
    data: UpdateBrandDTO,
    sharedContext?: Context,
  ): Promise<BrandDTO[]>;

  deleteBrands(brandIds: string[], sharedContext?: Context): Promise<void>;

  softDeleteBrands<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: SoftDeleteReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;

  restoreBrands<TReturnableLinkableKeys extends string = string>(
    ids: string[],
    config?: RestoreReturn<TReturnableLinkableKeys>,
    sharedContext?: Context,
  ): Promise<Record<string, string[]> | void>;
}
