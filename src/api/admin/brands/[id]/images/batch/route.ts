import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { updateBrandImagesWorkflow } from "@/workflows/brand/workflows/update-brand-images";
import { deleteBrandImagesWorkflow } from "@/workflows/brand/workflows/delete-brand-images";
import { z } from "zod";

export const UpdateBrandImagesSchema = z.object({
  updates: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(["thumbnail", "image"]),
      }),
    )
    .min(1, "At least one update is required"),
});

export const DeleteBrandImagesSchema = z.object({
  ids: z.array(z.string()).min(1, "At least one ID is required"),
});

type UpdateBrandImagesInput = z.infer<typeof UpdateBrandImagesSchema>;
type DeleteBrandImagesInput = z.infer<typeof DeleteBrandImagesSchema>;

export async function POST(
  req: MedusaRequest<UpdateBrandImagesInput>,
  res: MedusaResponse,
): Promise<void> {
  const { updates } = req.validatedBody;

  const { result } = await updateBrandImagesWorkflow(req.scope).run({
    input: { updates },
  });

  res.status(200).json({ brand_images: result });
}

export async function DELETE(
  req: MedusaRequest<DeleteBrandImagesInput>,
  res: MedusaResponse,
): Promise<void> {
  const { ids } = req.validatedBody;

  await deleteBrandImagesWorkflow(req.scope).run({
    input: { ids },
  });

  res.status(200).json({
    deleted: ids,
  });
}
