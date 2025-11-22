import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251122100940 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "price_conversion" ("id" text not null, "from" text not null, "to" text not null, "rate" numeric not null, "raw_rate" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "price_conversion_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_price_conversion_deleted_at" ON "price_conversion" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "price_conversion" cascade;`);
  }

}
