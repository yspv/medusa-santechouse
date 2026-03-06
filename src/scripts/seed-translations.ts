import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { batchTranslationsWorkflow } from "@medusajs/medusa/core-flows";
import productTranslations from "../../data/product_translations.json";

export default async function seedProductTranslations({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    logger.info("Starting product translation seeding...");

    // 1. Fetch all products with their metadata to map old_id -> medusa_id
    const { data: products } = await query.graph({
        entity: "product",
        fields: ["id", "metadata"],
    });

    const oldIdToMedusaId = new Map<number, string>();
    for (const product of products) {
        const oldId = product.metadata?.old_id;
        if (oldId !== undefined && oldId !== null) {
            oldIdToMedusaId.set(Number(oldId), product.id);
        }
    }

    logger.info(`Mapped ${oldIdToMedusaId.size} products from metadata.`);

    const translationsToCreate: any[] = [];
    let skippedCount = 0;

    for (const item of productTranslations) {
        if (item.lang == 'ru') {
            continue
        }
        const medusaProductId = oldIdToMedusaId.get(Number(item.product_id));

        if (!medusaProductId) {
            skippedCount++;
            continue;
        }

        translationsToCreate.push({
            reference_id: medusaProductId,
            reference: "product",
            locale_code: "uz-Uz",  // Ensure BCP 47 if needed, but Medusa docs show 'fr-FR', item.lang is 'uz'/'ru'
            translations: {
                title: item.title,
                description: typeof item.description === 'string' ? item.description : String(item.description),
            },
        });
    }

    logger.info(`Prepared ${translationsToCreate.length} translations. Skipped ${skippedCount} items due to missing product mapping.`);

    // 4. Run batchTranslationsWorkflow in chunks to avoid overloading
    const chunkSize = 100;
    for (let i = 0; i < translationsToCreate.length; i += chunkSize) {
        const chunk = translationsToCreate.slice(i, i + chunkSize);
        logger.info(`Processing chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(translationsToCreate.length / chunkSize)}...`);

        try {
            await batchTranslationsWorkflow(container).run({
                input: {
                    create: chunk,
                    update: [],
                    delete: [],
                },
            });
        } catch (error) {
            logger.error(`Error processing chunk at index ${i}: ${error.message}`);
        }
    }

    logger.info("Product translation seeding completed.");
}
