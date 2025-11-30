import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251130211105 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "cashback" drop constraint if exists "cashback_variant_id_unique";`);
    this.addSql(`alter table if exists "cashback_amount" drop constraint if exists "cashback_amount_cashback_id_foreign";`);

    this.addSql(`alter table if exists "cashback" add column if not exists "variant_id" text not null;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_cashback_variant_id_unique" ON "cashback" ("variant_id") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "cashback_amount" add constraint "cashback_amount_cashback_id_foreign" foreign key ("cashback_id") references "cashback" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "cashback_amount" drop constraint if exists "cashback_amount_cashback_id_foreign";`);

    this.addSql(`drop index if exists "IDX_cashback_variant_id_unique";`);
    this.addSql(`alter table if exists "cashback" drop column if exists "variant_id";`);

    this.addSql(`alter table if exists "cashback_amount" add constraint "cashback_amount_cashback_id_foreign" foreign key ("cashback_id") references "cashback" ("id") on update cascade;`);
  }

}
