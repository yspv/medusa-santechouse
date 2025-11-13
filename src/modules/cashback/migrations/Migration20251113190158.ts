import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251113190158 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "cashback_transaction" drop constraint if exists "cashback_transaction_type_check";`);

    this.addSql(`alter table if exists "cashback_transaction" add constraint "cashback_transaction_type_check" check("type" in ('earned', 'redeemed', 'adjustment'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "cashback_transaction" drop constraint if exists "cashback_transaction_type_check";`);

    this.addSql(`alter table if exists "cashback_transaction" add constraint "cashback_transaction_type_check" check("type" in ('earned', 'redeem', 'adjustment'));`);
  }

}
