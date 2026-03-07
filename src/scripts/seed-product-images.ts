import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";
import productImages from "../../data/product-images.json";
import {
  ExecArgs,
  ProductDTO,
  UpsertProductDTO,
} from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function ({ container }: ExecArgs) {
  const productService = container.resolve(Modules.PRODUCT);
  const products = await productService.listProducts(
    {},
    { select: ["id", "metadata"] },
  );
  const productMap = products.reduce((acc, product) => {
    const oldId = product.metadata?.["old_id"];
    if (!oldId) return acc;
    acc.set(oldId as number, product);
    return acc;
  }, new Map<number, ProductDTO>());

  const productToImage: Map<string, string[]> = new Map();

  for (const image of productImages) {
    const product = productMap.get(Number(image.product_id));
    if (!product) continue;
    const productImages = productToImage.get(product.id);
    if (!productImages) {
      productToImage.set(product.id, [image.url]);
    } else {
      productToImage.set(product.id, [...productImages, image.url]);
    }
  }

  const normalized = [...productToImage].map<UpsertProductDTO>(
    ([id, images]) => {
      return {
        id,
        thumbnail: images[0],
        images: images.map((image) => ({
          url: image,
        })),
      };
    },
  );

  await updateProductsWorkflow(container).run({
    input: {
      products: normalized,
    },
  });
}
