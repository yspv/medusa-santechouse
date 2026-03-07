#!/bin/bash

# Exit on error
set -e

echo "Starting full seeding process..."

echo "1/14 Seeding base infrastructure (seed.ts)..."
npx medusa exec ./src/scripts/seed.ts

echo "2/14 Seeding locales..."
npx medusa exec ./src/scripts/seed-locales.ts

echo "3/14 Seeding brands..."
npx medusa exec ./src/scripts/seed-brands.ts

echo "4/14 Seeding customers..."
npx medusa exec ./src/scripts/seed-customers.ts

echo "5/14 Seeding categories..."
npx medusa exec ./src/scripts/seed-categories.ts

echo "6/14 Seeding products..."
npx medusa exec ./src/scripts/seed-products.ts

echo "7/14 Seeding product-brands (links)..."
npx medusa exec ./src/scripts/seed-product-brands.ts

echo "8/14 Seeding product-images..."
npx medusa exec ./src/scripts/seed-product-images.ts

echo "9/14 Seeding category-images..."
npx medusa exec ./src/scripts/seed-category-images.ts

echo "10/14 Seeding product translations..."
npx medusa exec ./src/scripts/seed-translations.ts

echo "11/14 Seeding category translations..."
npx medusa exec ./src/scripts/seed-category-translations.ts

echo "12/14 Seeding cashbacks..."
npx medusa exec ./src/scripts/seed-cashbacks.ts

echo "13/14 Seeding cashback accounts..."
npx medusa exec ./src/scripts/seed-cashback-accounts.ts

echo "14/14 Seeding customer passwords..."
npx medusa exec ./src/scripts/seed-passwords.ts

echo "Seeding process completed successfully!"
