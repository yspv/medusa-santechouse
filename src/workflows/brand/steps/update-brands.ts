import { BRAND_MODULE } from "@/modules/brand";
import { UpdateBrandDTO } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const updateBrandsStepId = "update-brands";
export const updateBrandsStep = createStep(
  updateBrandsStepId,
  async (data: UpdateBrandDTO, { container }) => {
    const service = container.resolve(BRAND_MODULE);
    const [prevData] = await service.listBrands({ id: data.id });
    const brands = await service.updateBrands(data);
    return new StepResponse(brands, prevData);
  },
  async (prevData: UpdateBrandDTO, { container }) => {
    const service = container.resolve(BRAND_MODULE);
    await service.updateBrands(prevData);
  },
);
