import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { batchTranslationsWorkflow } from "@medusajs/medusa/core-flows";
import categoryTranslations from "../../data/category_translation.json";

export default async function seedCategoryTranslations({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    logger.info("Starting category translation seeding...");

    // 1. Fetch all product categories with their metadata to map old_id -> medusa_id
    const { data: categories } = await query.graph({
        entity: "product_category",
        fields: ["id", "metadata"],
    });

    const oldIdToMedusaId = new Map<number, string>();
    for (const category of categories) {
        const oldId = category.metadata?.old_id;
        if (oldId !== undefined && oldId !== null) {
            oldIdToMedusaId.set(Number(oldId), category.id);
        }
    }

    logger.info(`Mapped ${oldIdToMedusaId.size} categories from metadata.`);

    const translationsToCreate: any[] = [];
    let skippedCount = 0;

    for (const item of categoryTranslations) {
        // Skip 'ru' translations as they are likely the default or already handled
        if (item.lang === 'ru') {
            continue;
        }

        const medusaCategoryId = oldIdToMedusaId.get(Number(item.category_id));

        if (!medusaCategoryId) {
            skippedCount++;
            continue;
        }

        translationsToCreate.push({
            reference_id: medusaCategoryId,
            reference: "product_category",
            locale_code: "uz-Uz",
            translations: {
                name: typeof item.title === 'string' ? item.title : String(item.title),
            },
        });
    }

    logger.info(`Prepared ${translationsToCreate.length} translations. Skipped ${skippedCount} items due to missing category mapping.`);

    // 2. Run batchTranslationsWorkflow in chunks to avoid overloading
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

    logger.info("Category translation seeding completed.");
}
