import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251113183349 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "cashback" ("id" text not null, "is_active" boolean not null default false, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "cashback_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_cashback_deleted_at" ON "cashback" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "cashback_account" ("id" text not null, "version" integer not null default 1, "currency_code" text not null, "total_earned" numeric not null, "total_redeemed" numeric not null, "balance" numeric not null, "is_active" boolean not null default false, "metadata" jsonb null, "raw_total_earned" jsonb not null, "raw_total_redeemed" jsonb not null, "raw_balance" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "cashback_account_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_cashback_account_deleted_at" ON "cashback_account" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "cashback_amount" ("id" text not null, "cashback_id" text not null, "currency_code" text not null, "amount" numeric not null, "is_active" boolean not null default false, "metadata" jsonb null, "raw_amount" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "cashback_amount_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_cashback_amount_cashback_id" ON "cashback_amount" ("cashback_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_cashback_amount_deleted_at" ON "cashback_amount" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "cashback_transaction" ("id" text not null, "account_id" text not null, "reference_id" text null, "type" text check ("type" in ('earned', 'redeem', 'adjustment')) not null, "currency_code" text not null, "amount" numeric not null, "metadata" jsonb null, "raw_amount" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "cashback_transaction_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_cashback_transaction_account_id" ON "cashback_transaction" ("account_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_cashback_transaction_deleted_at" ON "cashback_transaction" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "cashback_amount" add constraint "cashback_amount_cashback_id_foreign" foreign key ("cashback_id") references "cashback" ("id") on update cascade;`);

    this.addSql(`alter table if exists "cashback_transaction" add constraint "cashback_transaction_account_id_foreign" foreign key ("account_id") references "cashback_account" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "cashback_amount" drop constraint if exists "cashback_amount_cashback_id_foreign";`);

    this.addSql(`alter table if exists "cashback_transaction" drop constraint if exists "cashback_transaction_account_id_foreign";`);

    this.addSql(`drop table if exists "cashback" cascade;`);

    this.addSql(`drop table if exists "cashback_account" cascade;`);

    this.addSql(`drop table if exists "cashback_amount" cascade;`);

    this.addSql(`drop table if exists "cashback_transaction" cascade;`);
  }

}
