import {
  CreateCategoryImagesInput,
  createCategoryImagesWorkflow,
} from "@/workflows/product-media/workflows/create-category-images";
import images from "../../data/category-images.json";
import { ExecArgs } from "@medusajs/types";

const getLastPath = (urlStr: string) => {
  try {
    const url = new URL(urlStr);
    const pathname = url.pathname;
    const segments = pathname.split("/").filter(Boolean);
    return segments.pop();
  } catch (e) {
    return null;
  }
};

export default async function ({ container }: ExecArgs) {
  const productService = container.resolve("product");
  const categories = await productService.listProductCategories(
    {},
    { select: ["id", "metadata"] },
  );
  const categoryMap = categories.reduce((acc, category) => {
    const oldId = category.metadata?.["old_id"];
    if (!oldId) return acc;
    acc.set(oldId as number, category.id);
    return acc;
  }, new Map<number, string>());

  const normalized: CreateCategoryImagesInput["category_images"] = [];

  for (const image of images) {
    const categoryId = categoryMap.get(Number(image.category_id));
    if (!categoryId) continue;
    const fileId = getLastPath(image.url);
    if (!fileId) continue;
    normalized.push({
      category_id: categoryId,
      type: "thumbnail",
      file_id: fileId,
      url: image.url,
    });
  }

  await createCategoryImagesWorkflow(container).run({
    input: { category_images: normalized },
  });
}
