import { BRAND_MODULE } from "@/modules/brand";
import { CreateBrandDTO, IBrandModuleService } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const createBrandStepId = "create-brand-step";
export const createBrandStep = createStep(
  createBrandStepId,
  async (data: CreateBrandDTO[], { container }) => {
    const service = container.resolve<IBrandModuleService>(BRAND_MODULE);
    const created = await service.createBrands(data);
    return new StepResponse(
      created,
      created.map((brand) => brand.id),
    );
  },
  async (createdIds, { container }) => {
    if (!createdIds?.length) return;
    const service = container.resolve<IBrandModuleService>(BRAND_MODULE);
    await service.deleteBrands(createdIds);
  },
);
