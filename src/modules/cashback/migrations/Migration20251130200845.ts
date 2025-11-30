import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251130200845 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "cashback_account" drop constraint if exists "cashback_account_customer_currency_unique";`);
    this.addSql(`alter table if exists "cashback_account" add column if not exists "customer_id" text not null;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_cashback_account_customer_currency_unique" ON "cashback_account" ("customer_id", "currency_code") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index if exists "IDX_cashback_account_customer_currency_unique";`);
    this.addSql(`alter table if exists "cashback_account" drop column if exists "customer_id";`);
  }

}
