import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_product_showcase_benefits_icon" AS ENUM('leaf', 'star', 'flask', 'eye', 'heart', 'droplet', 'sparkles', 'shield', 'waves', 'atom', 'user', 'check', 'flower', 'hair', 'gem', 'ban');
  CREATE TYPE "public"."enum_pages_blocks_product_showcase_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_product_showcase_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_product_showcase_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_product_showcase_style" AS ENUM('studio', 'editorial');
  CREATE TYPE "public"."enum_pages_blocks_product_showcase_background" AS ENUM('white', 'cream', 'lavender', 'dark', 'mist', 'gold');
  CREATE TYPE "public"."enum__pages_v_blocks_product_showcase_benefits_icon" AS ENUM('leaf', 'star', 'flask', 'eye', 'heart', 'droplet', 'sparkles', 'shield', 'waves', 'atom', 'user', 'check', 'flower', 'hair', 'gem', 'ban');
  CREATE TYPE "public"."enum__pages_v_blocks_product_showcase_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_product_showcase_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_product_showcase_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_product_showcase_style" AS ENUM('studio', 'editorial');
  CREATE TYPE "public"."enum__pages_v_blocks_product_showcase_background" AS ENUM('white', 'cream', 'lavender', 'dark', 'mist', 'gold');
  CREATE TABLE "pages_blocks_product_showcase_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_product_showcase_benefits_icon" DEFAULT 'sparkles',
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_product_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"footnote" varchar,
  	"primary_cta_type" "enum_pages_blocks_product_showcase_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum_pages_blocks_product_showcase_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"media_id" integer,
  	"video_poster_id" integer,
  	"media_position" "enum_pages_blocks_product_showcase_media_position" DEFAULT 'left',
  	"style" "enum_pages_blocks_product_showcase_style" DEFAULT 'studio',
  	"background" "enum_pages_blocks_product_showcase_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_showcase_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_product_showcase_benefits_icon" DEFAULT 'sparkles',
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"footnote" varchar,
  	"primary_cta_type" "enum__pages_v_blocks_product_showcase_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum__pages_v_blocks_product_showcase_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"media_id" integer,
  	"video_poster_id" integer,
  	"media_position" "enum__pages_v_blocks_product_showcase_media_position" DEFAULT 'left',
  	"style" "enum__pages_v_blocks_product_showcase_style" DEFAULT 'studio',
  	"background" "enum__pages_v_blocks_product_showcase_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_product_showcase_benefits" ADD CONSTRAINT "pages_blocks_product_showcase_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase" ADD CONSTRAINT "pages_blocks_product_showcase_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase" ADD CONSTRAINT "pages_blocks_product_showcase_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase" ADD CONSTRAINT "pages_blocks_product_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase_benefits" ADD CONSTRAINT "_pages_v_blocks_product_showcase_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase" ADD CONSTRAINT "_pages_v_blocks_product_showcase_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase" ADD CONSTRAINT "_pages_v_blocks_product_showcase_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase" ADD CONSTRAINT "_pages_v_blocks_product_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_product_showcase_benefits_order_idx" ON "pages_blocks_product_showcase_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_showcase_benefits_parent_id_idx" ON "pages_blocks_product_showcase_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_showcase_order_idx" ON "pages_blocks_product_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_showcase_parent_id_idx" ON "pages_blocks_product_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_showcase_path_idx" ON "pages_blocks_product_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_showcase_media_idx" ON "pages_blocks_product_showcase" USING btree ("media_id");
  CREATE INDEX "pages_blocks_product_showcase_video_poster_idx" ON "pages_blocks_product_showcase" USING btree ("video_poster_id");
  CREATE INDEX "_pages_v_blocks_product_showcase_benefits_order_idx" ON "_pages_v_blocks_product_showcase_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_showcase_benefits_parent_id_idx" ON "_pages_v_blocks_product_showcase_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_showcase_order_idx" ON "_pages_v_blocks_product_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_showcase_parent_id_idx" ON "_pages_v_blocks_product_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_showcase_path_idx" ON "_pages_v_blocks_product_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_showcase_media_idx" ON "_pages_v_blocks_product_showcase" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_product_showcase_video_poster_idx" ON "_pages_v_blocks_product_showcase" USING btree ("video_poster_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_product_showcase_benefits" CASCADE;
  DROP TABLE "pages_blocks_product_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_product_showcase_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_product_showcase" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_product_showcase_benefits_icon";
  DROP TYPE "public"."enum_pages_blocks_product_showcase_primary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_product_showcase_secondary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_product_showcase_media_position";
  DROP TYPE "public"."enum_pages_blocks_product_showcase_style";
  DROP TYPE "public"."enum_pages_blocks_product_showcase_background";
  DROP TYPE "public"."enum__pages_v_blocks_product_showcase_benefits_icon";
  DROP TYPE "public"."enum__pages_v_blocks_product_showcase_primary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_product_showcase_secondary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_product_showcase_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_product_showcase_style";
  DROP TYPE "public"."enum__pages_v_blocks_product_showcase_background";`)
}
