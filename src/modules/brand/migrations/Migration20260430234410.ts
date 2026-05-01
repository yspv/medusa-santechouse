import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260430234410 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "brand" add column if not exists "handle" text not null default '';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "brand" drop column if exists "handle";`);
  }

}
