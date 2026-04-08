import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createBrandImagesWorkflow } from "@/workflows/brand/workflows/create-brand-images";
import { z } from "zod";

export const CreateBrandImagesSchema = z.object({
  images: z
    .array(
      z.object({
        type: z.enum(["thumbnail", "image"]),
        url: z.string(),
        file_id: z.string(),
      }),
    )
    .min(1, "At least one image is required"),
});

type CreateBrandImagesInput = z.infer<typeof CreateBrandImagesSchema>;

export async function POST(
  req: MedusaRequest<CreateBrandImagesInput>,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;
  const { images } = req.validatedBody;

  const brand_images = images.map((image) => ({
    ...image,
    brand_id: id,
  }));

  const { result } = await createBrandImagesWorkflow(req.scope).run({
    input: {
      brand_images,
    },
  });

  res.status(200).json({ brand_images: result });
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;
  const query = req.scope.resolve("query");

  const { data: brandImages } = await query.graph({
    entity: "brand_image",
    fields: ["*"],
    filters: {
      brand_id: id,
    },
  });

  res.status(200).json({ brand_images: brandImages });
}
