import { BRAND_MODULE } from "@/modules/brand";
import {
  FilterableBrandProps,
  IBrandModuleService,
  UpdateBrandDTO,
  UpsertBrandDTO,
} from "@/types";
import {
  getSelectsAndRelationsFromObjectArray,
  MedusaError,
  MedusaErrorCodes,
} from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type UpdateBrandsStepInput =
  | {
      selector: FilterableBrandProps;
      update: UpdateBrandDTO;
    }
  | {
      brands: UpsertBrandDTO[];
    };
export const updateBrandsStepId = "update-brands";
export const updateBrandsStep = createStep(
  updateBrandsStepId,
  async (data: UpdateBrandsStepInput, { container }) => {
    const service = container.resolve<IBrandModuleService>(BRAND_MODULE);
    if ("brands" in data) {
      if (data.brands.some((b) => !b.id)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Brand ID is required when doing a batch update of brands",
        );
      }
      if (!data.brands.length) {
        return new StepResponse([], []);
      }
      const prevData = await service.listBrands({
        id: data.brands.map((b) => b.id) as string[],
      });
      const brands = await service.upsertBrands(data.brands);
      return new StepResponse(brands, prevData);
    }

    const { selects, relations } = getSelectsAndRelationsFromObjectArray([
      data.update,
    ]);
    const prevData = await service.listBrands(data.selector, {
      select: selects,
      relations,
    });

    const brands = await service.updateBrands(data.selector, data.update);
    return new StepResponse(brands, prevData);
  },
  async (prevData, { container }) => {
    if (!prevData?.length) return;
    const service = container.resolve<IBrandModuleService>(BRAND_MODULE);
    await service.upsertBrands(
      prevData.map((r) => ({
        ...(r as unknown as UpdateBrandDTO),
      })),
    );
  },
);
