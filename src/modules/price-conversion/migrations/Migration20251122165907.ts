import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251122165907 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "price_conversion" drop column if exists "raw_rate";`);

    this.addSql(`alter table if exists "price_conversion" alter column "rate" type integer using ("rate"::integer);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "price_conversion" add column if not exists "raw_rate" jsonb not null;`);
    this.addSql(`alter table if exists "price_conversion" alter column "rate" type numeric using ("rate"::numeric);`);
  }

}
