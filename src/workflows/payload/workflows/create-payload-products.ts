import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  updateProductsWorkflow,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows";
import { createPayloadProductsFields } from "../utils/fields";
import { createPayloadItemsStep } from "../steps";
import { Product } from ".medusa/types/query-entry-points";

export type CreatePayloadProductsWorkflow = {
  ids: string[];
};

const prepareCreateProducts = (data: { products: Product[] }) => {
  return {
    collection: "products",
    items: data.products.map((product) => ({
      medusa_id: product.id,
      title: product.title,
      subtitle: product.subtitle,
      description: product.description || "",
      options: product.options.map((option) => ({
        title: option.title,
        medusa_id: option.id,
      })),
      variants: product.variants.map((variant) => ({
        medusa_id: variant.id,
        title: variant.title,
        options_values: variant.options.map((option) => ({
          medusa_id: option.id,
          medusa_option_id: option.option?.id,
          value: option.value,
        })),
      })),
      createdAt: product.created_at as string,
      updatedAt: product.updated_at as string,
    })),
  };
};

export const createPayloadProductsWorkflowId = "create-payload-products";
export const createPayloadProductsWorkflow = createWorkflow(
  createPayloadProductsWorkflowId,
  (input: CreatePayloadProductsWorkflow) => {
    const { data: products } = useQueryGraphStep({
      entity: "product",
      fields: createPayloadProductsFields,
      filters: {
        id: input.ids,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    });

    const createData = transform({ products }, prepareCreateProducts);

    const { items } = createPayloadItemsStep(createData);

    const updateData = transform({ items, products }, (data) => {
      const productMap = new Map(
        data.products.map((product) => [product.id, product])
      );
      
      return data.items.map((item) => {
        const product = productMap.get(item.medusa_id);
        const existingMetadata = product?.metadata || {};
        
        return {
          id: item.medusa_id,
          metadata: {
            ...existingMetadata,
            payload_id: item.id,
          },
        };
      });
    });

    updateProductsWorkflow.runAsStep({
      input: {
        products: updateData,
      },
    });

    return new WorkflowResponse({
      items,
    });
  },
);
