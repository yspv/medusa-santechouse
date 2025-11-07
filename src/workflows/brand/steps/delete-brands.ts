import { BRAND_MODULE } from "@/modules/brand";
import { IBrandModuleService } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const deleteBrandsStepId = "delete-brands";
export const deleteBrandsStep = createStep(
  deleteBrandsStepId,
  async (ids: string[], { container }) => {
    const service = container.resolve<IBrandModuleService>(BRAND_MODULE);
    await service.softDeleteBrands(ids);
    return new StepResponse(void 0, ids);
  },
  async (prevIds, { container }) => {
    if (!prevIds?.length) return;
    const service = container.resolve<IBrandModuleService>(BRAND_MODULE);
    await service.restoreBrands(prevIds);
  },
);
