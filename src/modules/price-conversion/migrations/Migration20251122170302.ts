import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251122170302 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "price_conversion" alter column "rate" type real using ("rate"::real);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "price_conversion" alter column "rate" type integer using ("rate"::integer);`);
  }

}
