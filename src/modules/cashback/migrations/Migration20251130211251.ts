import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251130211251 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "cashback_amount" drop constraint if exists "cashback_account_cashback_id_currency_code_unique";`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_cashback_account_cashback_id_currency_code_unique" ON "cashback_amount" ("cashback_id", "currency_code") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index if exists "IDX_cashback_account_cashback_id_currency_code_unique";`);
  }

}
