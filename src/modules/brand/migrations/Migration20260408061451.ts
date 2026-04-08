import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260408061451 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "brand_image" ("id" text not null, "url" text not null, "file_id" text not null, "type" text check ("type" in ('thumbnail', 'image')) not null, "brand_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "brand_image_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_brand_image_brand_id" ON "brand_image" ("brand_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_brand_image_deleted_at" ON "brand_image" ("deleted_at") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "unique_thumbnail_per_brand" ON "brand_image" ("brand_id", "type") WHERE type = 'thumbnail' AND deleted_at IS NULL;`);

    this.addSql(`alter table if exists "brand_image" add constraint "brand_image_brand_id_foreign" foreign key ("brand_id") references "brand" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "brand_image" cascade;`);
  }

}
