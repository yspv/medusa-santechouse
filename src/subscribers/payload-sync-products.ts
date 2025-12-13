import { createPayloadProductsWorkflow } from "@/workflows/payload/workflows";
import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

const BATCH_SIZE = 50; // Reduced batch size to avoid timeouts
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function processBatchWithRetry(
  container: any,
  productIds: string[],
  batchNumber: number,
  retryCount = 0,
): Promise<void> {
  try {
    await createPayloadProductsWorkflow(container).run({
      input: {
        ids: productIds,
      },
    });
    console.log(
      `✓ Successfully synced batch ${batchNumber} with ${productIds.length} products`,
    );
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.warn(
        `⚠ Batch ${batchNumber} failed (attempt ${retryCount + 1}/${MAX_RETRIES}). Retrying in ${RETRY_DELAY_MS}ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return processBatchWithRetry(
        container,
        productIds,
        batchNumber,
        retryCount + 1,
      );
    }
    console.error(
      `✗ Failed to sync batch ${batchNumber} after ${MAX_RETRIES} attempts:`,
      error,
    );
    throw error;
  }
}

export default async function payloadSyncProductsHandler({
  container,
}: SubscriberArgs) {
  const query = container.resolve("query");
  const limit = BATCH_SIZE;
  let offset = 0;
  let totalProcessed = 0;
  let batchNumber = 1;
  let totalCount = 0;

  console.log("🚀 Starting payload products sync...");

  // First, get the total count
  const initialQuery = await query.graph({
    entity: "products",
    fields: ["id"],
    pagination: {
      take: 1,
      skip: 0,
    },
  });
  totalCount = initialQuery.metadata?.count || 0;

  console.log(`📊 Total products to sync: ${totalCount}`);

  // Process products in batches
  while (offset < totalCount) {
    try {
      const { data: products, metadata } = await query.graph({
        entity: "products",
        fields: ["id", "metadata"],
        pagination: {
          take: limit,
          skip: offset,
        },
      });

      if (products.length === 0) {
        console.log("⚠ No more products to process");
        break;
      }

      const productIds = products.map((p) => p.id);
      await processBatchWithRetry(container, productIds, batchNumber);

      totalProcessed += products.length;
      offset += limit;
      batchNumber++;

      console.log(
        `📈 Progress: ${totalProcessed}/${totalCount} products synced (${Math.round((totalProcessed / totalCount) * 100)}%)`,
      );
    } catch (error) {
      console.error(`✗ Error processing batch at offset ${offset}:`, error);
      offset += limit;
      batchNumber++;
    }
  }

  console.log(
    `✅ Payload products sync completed! Processed ${totalProcessed} products in ${batchNumber - 1} batches`,
  );
}

export const config: SubscriberConfig = {
  event: "products.sync-payload",
};
