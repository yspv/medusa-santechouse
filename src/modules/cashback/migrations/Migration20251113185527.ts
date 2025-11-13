import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251113185527 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "cashback_account" alter column "total_earned" type numeric using ("total_earned"::numeric);`);
    this.addSql(`alter table if exists "cashback_account" alter column "total_earned" set default 0;`);
    this.addSql(`alter table if exists "cashback_account" alter column "total_redeemed" type numeric using ("total_redeemed"::numeric);`);
    this.addSql(`alter table if exists "cashback_account" alter column "total_redeemed" set default 0;`);
    this.addSql(`alter table if exists "cashback_account" alter column "balance" type numeric using ("balance"::numeric);`);
    this.addSql(`alter table if exists "cashback_account" alter column "balance" set default 0;`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_total_earned" type jsonb using ("raw_total_earned"::jsonb);`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_total_earned" set default '{"value":"0","precision":20}';`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_total_redeemed" type jsonb using ("raw_total_redeemed"::jsonb);`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_total_redeemed" set default '{"value":"0","precision":20}';`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_balance" type jsonb using ("raw_balance"::jsonb);`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_balance" set default '{"value":"0","precision":20}';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "cashback_account" alter column "total_earned" drop default;`);
    this.addSql(`alter table if exists "cashback_account" alter column "total_earned" type numeric using ("total_earned"::numeric);`);
    this.addSql(`alter table if exists "cashback_account" alter column "total_redeemed" drop default;`);
    this.addSql(`alter table if exists "cashback_account" alter column "total_redeemed" type numeric using ("total_redeemed"::numeric);`);
    this.addSql(`alter table if exists "cashback_account" alter column "balance" drop default;`);
    this.addSql(`alter table if exists "cashback_account" alter column "balance" type numeric using ("balance"::numeric);`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_total_earned" drop default;`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_total_earned" type jsonb using ("raw_total_earned"::jsonb);`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_total_redeemed" drop default;`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_total_redeemed" type jsonb using ("raw_total_redeemed"::jsonb);`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_balance" drop default;`);
    this.addSql(`alter table if exists "cashback_account" alter column "raw_balance" type jsonb using ("raw_balance"::jsonb);`);
  }

}
