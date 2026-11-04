import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_product_steps_style" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_product_grid_card_style" AS ENUM('standard', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_pillar_index_layout" AS ENUM('accordion', 'list');
  CREATE TYPE "public"."enum_pages_blocks_ingredient_spotlight_layout" AS ENUM('oval', 'split');
  CREATE TYPE "public"."enum_pages_blocks_split_hero_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_split_hero_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_split_hero_background" AS ENUM('white', 'cream', 'lavender', 'dark', 'mist', 'gold');
  CREATE TYPE "public"."enum_pages_blocks_statement_background" AS ENUM('white', 'cream', 'lavender', 'dark', 'mist', 'gold');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_background" AS ENUM('white', 'cream', 'lavender', 'dark', 'mist', 'gold');
  CREATE TYPE "public"."enum__pages_v_blocks_product_steps_style" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum__pages_v_blocks_product_grid_card_style" AS ENUM('standard', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_pillar_index_layout" AS ENUM('accordion', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_layout" AS ENUM('oval', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_split_hero_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_split_hero_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_split_hero_background" AS ENUM('white', 'cream', 'lavender', 'dark', 'mist', 'gold');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_background" AS ENUM('white', 'cream', 'lavender', 'dark', 'mist', 'gold');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_background" AS ENUM('white', 'cream', 'lavender', 'dark', 'mist', 'gold');
  ALTER TYPE "public"."enum_pages_blocks_range_grid_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_range_grid_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_category_grid_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_category_grid_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_split_content_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_split_content_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_pillars_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_pillars_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_product_steps_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_product_steps_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_product_grid_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_product_grid_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_cta_banner_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_cta_banner_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_company_details_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_company_details_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_manifesto_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_manifesto_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_pillar_index_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_pillar_index_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_product_carousel_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_product_carousel_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum_pages_blocks_ingredient_spotlight_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum_pages_blocks_ingredient_spotlight_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_range_grid_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_range_grid_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_category_grid_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_category_grid_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_split_content_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_split_content_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_pillars_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_pillars_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_product_steps_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_product_steps_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_product_grid_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_product_grid_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_banner_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_banner_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_company_details_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_company_details_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_manifesto_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_manifesto_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_pillar_index_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_pillar_index_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_product_carousel_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_product_carousel_background" ADD VALUE 'gold';
  ALTER TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_background" ADD VALUE 'mist';
  ALTER TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_background" ADD VALUE 'gold';
  CREATE TABLE "pages_blocks_split_hero_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_split_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"primary_cta_type" "enum_pages_blocks_split_hero_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum_pages_blocks_split_hero_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"image_id" integer,
  	"image_badge_eyebrow" varchar,
  	"image_badge_text" varchar,
  	"background" "enum_pages_blocks_split_hero_background" DEFAULT 'mist',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tagline_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_tagline_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"footnote" varchar,
  	"background" "enum_pages_blocks_statement_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"cta_type" "enum_pages_blocks_cta_band_cta_type" DEFAULT 'internal',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"background" "enum_pages_blocks_cta_band_background" DEFAULT 'gold',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_hero_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"primary_cta_type" "enum__pages_v_blocks_split_hero_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum__pages_v_blocks_split_hero_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"image_id" integer,
  	"image_badge_eyebrow" varchar,
  	"image_badge_text" varchar,
  	"background" "enum__pages_v_blocks_split_hero_background" DEFAULT 'mist',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tagline_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tagline_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"footnote" varchar,
  	"background" "enum__pages_v_blocks_statement_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"cta_type" "enum__pages_v_blocks_cta_band_cta_type" DEFAULT 'internal',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"background" "enum__pages_v_blocks_cta_band_background" DEFAULT 'gold',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_product_steps" ADD COLUMN "style" "enum_pages_blocks_product_steps_style" DEFAULT 'list';
  ALTER TABLE "pages_blocks_product_grid" ADD COLUMN "card_style" "enum_pages_blocks_product_grid_card_style" DEFAULT 'standard';
  ALTER TABLE "pages_blocks_pillar_index" ADD COLUMN "layout" "enum_pages_blocks_pillar_index_layout" DEFAULT 'accordion';
  ALTER TABLE "pages_blocks_ingredient_spotlight" ADD COLUMN "layout" "enum_pages_blocks_ingredient_spotlight_layout" DEFAULT 'oval';
  ALTER TABLE "pages_blocks_ingredient_spotlight" ADD COLUMN "image_badge_eyebrow" varchar;
  ALTER TABLE "pages_blocks_ingredient_spotlight" ADD COLUMN "image_badge_text" varchar;
  ALTER TABLE "_pages_v_blocks_product_steps" ADD COLUMN "style" "enum__pages_v_blocks_product_steps_style" DEFAULT 'list';
  ALTER TABLE "_pages_v_blocks_product_grid" ADD COLUMN "card_style" "enum__pages_v_blocks_product_grid_card_style" DEFAULT 'standard';
  ALTER TABLE "_pages_v_blocks_pillar_index" ADD COLUMN "layout" "enum__pages_v_blocks_pillar_index_layout" DEFAULT 'accordion';
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ADD COLUMN "layout" "enum__pages_v_blocks_ingredient_spotlight_layout" DEFAULT 'oval';
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ADD COLUMN "image_badge_eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ADD COLUMN "image_badge_text" varchar;
  ALTER TABLE "pages_blocks_split_hero_points" ADD CONSTRAINT "pages_blocks_split_hero_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_hero" ADD CONSTRAINT "pages_blocks_split_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_hero" ADD CONSTRAINT "pages_blocks_split_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tagline_strip_items" ADD CONSTRAINT "pages_blocks_tagline_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tagline_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tagline_strip" ADD CONSTRAINT "pages_blocks_tagline_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_hero_points" ADD CONSTRAINT "_pages_v_blocks_split_hero_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_hero" ADD CONSTRAINT "_pages_v_blocks_split_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_hero" ADD CONSTRAINT "_pages_v_blocks_split_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tagline_strip_items" ADD CONSTRAINT "_pages_v_blocks_tagline_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tagline_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tagline_strip" ADD CONSTRAINT "_pages_v_blocks_tagline_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_split_hero_points_order_idx" ON "pages_blocks_split_hero_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_hero_points_parent_id_idx" ON "pages_blocks_split_hero_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_hero_order_idx" ON "pages_blocks_split_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_hero_parent_id_idx" ON "pages_blocks_split_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_hero_path_idx" ON "pages_blocks_split_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_hero_image_idx" ON "pages_blocks_split_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_tagline_strip_items_order_idx" ON "pages_blocks_tagline_strip_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tagline_strip_items_parent_id_idx" ON "pages_blocks_tagline_strip_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tagline_strip_order_idx" ON "pages_blocks_tagline_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_tagline_strip_parent_id_idx" ON "pages_blocks_tagline_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tagline_strip_path_idx" ON "pages_blocks_tagline_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_hero_points_order_idx" ON "_pages_v_blocks_split_hero_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_hero_points_parent_id_idx" ON "_pages_v_blocks_split_hero_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_hero_order_idx" ON "_pages_v_blocks_split_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_hero_parent_id_idx" ON "_pages_v_blocks_split_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_hero_path_idx" ON "_pages_v_blocks_split_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_hero_image_idx" ON "_pages_v_blocks_split_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_tagline_strip_items_order_idx" ON "_pages_v_blocks_tagline_strip_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tagline_strip_items_parent_id_idx" ON "_pages_v_blocks_tagline_strip_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tagline_strip_order_idx" ON "_pages_v_blocks_tagline_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tagline_strip_parent_id_idx" ON "_pages_v_blocks_tagline_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tagline_strip_path_idx" ON "_pages_v_blocks_tagline_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_split_hero_points" CASCADE;
  DROP TABLE "pages_blocks_split_hero" CASCADE;
  DROP TABLE "pages_blocks_tagline_strip_items" CASCADE;
  DROP TABLE "pages_blocks_tagline_strip" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "_pages_v_blocks_split_hero_points" CASCADE;
  DROP TABLE "_pages_v_blocks_split_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_tagline_strip_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tagline_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band" CASCADE;
  ALTER TABLE "pages_blocks_range_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_range_grid" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_range_grid_background";
  CREATE TYPE "public"."enum_pages_blocks_range_grid_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_range_grid" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_range_grid_background";
  ALTER TABLE "pages_blocks_range_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_range_grid_background" USING "background"::"public"."enum_pages_blocks_range_grid_background";
  ALTER TABLE "pages_blocks_category_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_category_grid" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_category_grid_background";
  CREATE TYPE "public"."enum_pages_blocks_category_grid_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_category_grid" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_category_grid_background";
  ALTER TABLE "pages_blocks_category_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_category_grid_background" USING "background"::"public"."enum_pages_blocks_category_grid_background";
  ALTER TABLE "pages_blocks_split_content" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_split_content" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_split_content_background";
  CREATE TYPE "public"."enum_pages_blocks_split_content_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_split_content" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_split_content_background";
  ALTER TABLE "pages_blocks_split_content" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_split_content_background" USING "background"::"public"."enum_pages_blocks_split_content_background";
  ALTER TABLE "pages_blocks_pillars" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_pillars" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_pillars_background";
  CREATE TYPE "public"."enum_pages_blocks_pillars_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_pillars" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_pillars_background";
  ALTER TABLE "pages_blocks_pillars" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_pillars_background" USING "background"::"public"."enum_pages_blocks_pillars_background";
  ALTER TABLE "pages_blocks_product_steps" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_steps" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_product_steps_background";
  CREATE TYPE "public"."enum_pages_blocks_product_steps_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_product_steps" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_product_steps_background";
  ALTER TABLE "pages_blocks_product_steps" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_product_steps_background" USING "background"::"public"."enum_pages_blocks_product_steps_background";
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_product_grid_background";
  CREATE TYPE "public"."enum_pages_blocks_product_grid_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_product_grid_background";
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_product_grid_background" USING "background"::"public"."enum_pages_blocks_product_grid_background";
  ALTER TABLE "pages_blocks_cta_banner" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_banner" ALTER COLUMN "background" SET DEFAULT 'dark'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_banner_background";
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_cta_banner" ALTER COLUMN "background" SET DEFAULT 'dark'::"public"."enum_pages_blocks_cta_banner_background";
  ALTER TABLE "pages_blocks_cta_banner" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_cta_banner_background" USING "background"::"public"."enum_pages_blocks_cta_banner_background";
  ALTER TABLE "pages_blocks_company_details" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_company_details" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_company_details_background";
  CREATE TYPE "public"."enum_pages_blocks_company_details_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_company_details" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_company_details_background";
  ALTER TABLE "pages_blocks_company_details" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_company_details_background" USING "background"::"public"."enum_pages_blocks_company_details_background";
  ALTER TABLE "pages_blocks_manifesto" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_manifesto" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_manifesto_background";
  CREATE TYPE "public"."enum_pages_blocks_manifesto_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_manifesto" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_manifesto_background";
  ALTER TABLE "pages_blocks_manifesto" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_manifesto_background" USING "background"::"public"."enum_pages_blocks_manifesto_background";
  ALTER TABLE "pages_blocks_pillar_index" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_pillar_index" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_pillar_index_background";
  CREATE TYPE "public"."enum_pages_blocks_pillar_index_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_pillar_index" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_pillar_index_background";
  ALTER TABLE "pages_blocks_pillar_index" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_pillar_index_background" USING "background"::"public"."enum_pages_blocks_pillar_index_background";
  ALTER TABLE "pages_blocks_product_carousel" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_carousel" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_product_carousel_background";
  CREATE TYPE "public"."enum_pages_blocks_product_carousel_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_product_carousel" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_product_carousel_background";
  ALTER TABLE "pages_blocks_product_carousel" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_product_carousel_background" USING "background"::"public"."enum_pages_blocks_product_carousel_background";
  ALTER TABLE "pages_blocks_ingredient_spotlight" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_ingredient_spotlight" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum_pages_blocks_ingredient_spotlight_background";
  CREATE TYPE "public"."enum_pages_blocks_ingredient_spotlight_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "pages_blocks_ingredient_spotlight" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum_pages_blocks_ingredient_spotlight_background";
  ALTER TABLE "pages_blocks_ingredient_spotlight" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_ingredient_spotlight_background" USING "background"::"public"."enum_pages_blocks_ingredient_spotlight_background";
  ALTER TABLE "_pages_v_blocks_range_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_range_grid" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_range_grid_background";
  CREATE TYPE "public"."enum__pages_v_blocks_range_grid_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_range_grid" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_range_grid_background";
  ALTER TABLE "_pages_v_blocks_range_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_range_grid_background" USING "background"::"public"."enum__pages_v_blocks_range_grid_background";
  ALTER TABLE "_pages_v_blocks_category_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_category_grid" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_category_grid_background";
  CREATE TYPE "public"."enum__pages_v_blocks_category_grid_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_category_grid" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_category_grid_background";
  ALTER TABLE "_pages_v_blocks_category_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_category_grid_background" USING "background"::"public"."enum__pages_v_blocks_category_grid_background";
  ALTER TABLE "_pages_v_blocks_split_content" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_split_content" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_split_content_background";
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_split_content" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_split_content_background";
  ALTER TABLE "_pages_v_blocks_split_content" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_split_content_background" USING "background"::"public"."enum__pages_v_blocks_split_content_background";
  ALTER TABLE "_pages_v_blocks_pillars" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_pillars" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_pillars_background";
  CREATE TYPE "public"."enum__pages_v_blocks_pillars_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_pillars" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_pillars_background";
  ALTER TABLE "_pages_v_blocks_pillars" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_pillars_background" USING "background"::"public"."enum__pages_v_blocks_pillars_background";
  ALTER TABLE "_pages_v_blocks_product_steps" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_steps" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_product_steps_background";
  CREATE TYPE "public"."enum__pages_v_blocks_product_steps_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_product_steps" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_product_steps_background";
  ALTER TABLE "_pages_v_blocks_product_steps" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_product_steps_background" USING "background"::"public"."enum__pages_v_blocks_product_steps_background";
  ALTER TABLE "_pages_v_blocks_product_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_grid" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_product_grid_background";
  CREATE TYPE "public"."enum__pages_v_blocks_product_grid_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_product_grid" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_product_grid_background";
  ALTER TABLE "_pages_v_blocks_product_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_product_grid_background" USING "background"::"public"."enum__pages_v_blocks_product_grid_background";
  ALTER TABLE "_pages_v_blocks_cta_banner" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_banner" ALTER COLUMN "background" SET DEFAULT 'dark'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_background";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_cta_banner" ALTER COLUMN "background" SET DEFAULT 'dark'::"public"."enum__pages_v_blocks_cta_banner_background";
  ALTER TABLE "_pages_v_blocks_cta_banner" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_cta_banner_background" USING "background"::"public"."enum__pages_v_blocks_cta_banner_background";
  ALTER TABLE "_pages_v_blocks_company_details" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_company_details" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_company_details_background";
  CREATE TYPE "public"."enum__pages_v_blocks_company_details_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_company_details" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_company_details_background";
  ALTER TABLE "_pages_v_blocks_company_details" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_company_details_background" USING "background"::"public"."enum__pages_v_blocks_company_details_background";
  ALTER TABLE "_pages_v_blocks_manifesto" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_manifesto" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_manifesto_background";
  CREATE TYPE "public"."enum__pages_v_blocks_manifesto_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_manifesto" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_manifesto_background";
  ALTER TABLE "_pages_v_blocks_manifesto" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_manifesto_background" USING "background"::"public"."enum__pages_v_blocks_manifesto_background";
  ALTER TABLE "_pages_v_blocks_pillar_index" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_pillar_index" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_pillar_index_background";
  CREATE TYPE "public"."enum__pages_v_blocks_pillar_index_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_pillar_index" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_pillar_index_background";
  ALTER TABLE "_pages_v_blocks_pillar_index" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_pillar_index_background" USING "background"::"public"."enum__pages_v_blocks_pillar_index_background";
  ALTER TABLE "_pages_v_blocks_product_carousel" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_carousel" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_product_carousel_background";
  CREATE TYPE "public"."enum__pages_v_blocks_product_carousel_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_product_carousel" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_product_carousel_background";
  ALTER TABLE "_pages_v_blocks_product_carousel" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_product_carousel_background" USING "background"::"public"."enum__pages_v_blocks_product_carousel_background";
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ALTER COLUMN "background" SET DEFAULT 'white'::text;
  DROP TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_background";
  CREATE TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ALTER COLUMN "background" SET DEFAULT 'white'::"public"."enum__pages_v_blocks_ingredient_spotlight_background";
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ALTER COLUMN "background" SET DATA TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_background" USING "background"::"public"."enum__pages_v_blocks_ingredient_spotlight_background";
  ALTER TABLE "pages_blocks_product_steps" DROP COLUMN "style";
  ALTER TABLE "pages_blocks_product_grid" DROP COLUMN "card_style";
  ALTER TABLE "pages_blocks_pillar_index" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_ingredient_spotlight" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_ingredient_spotlight" DROP COLUMN "image_badge_eyebrow";
  ALTER TABLE "pages_blocks_ingredient_spotlight" DROP COLUMN "image_badge_text";
  ALTER TABLE "_pages_v_blocks_product_steps" DROP COLUMN "style";
  ALTER TABLE "_pages_v_blocks_product_grid" DROP COLUMN "card_style";
  ALTER TABLE "_pages_v_blocks_pillar_index" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" DROP COLUMN "image_badge_eyebrow";
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" DROP COLUMN "image_badge_text";
  DROP TYPE "public"."enum_pages_blocks_product_steps_style";
  DROP TYPE "public"."enum_pages_blocks_product_grid_card_style";
  DROP TYPE "public"."enum_pages_blocks_pillar_index_layout";
  DROP TYPE "public"."enum_pages_blocks_ingredient_spotlight_layout";
  DROP TYPE "public"."enum_pages_blocks_split_hero_primary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_split_hero_secondary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_split_hero_background";
  DROP TYPE "public"."enum_pages_blocks_statement_background";
  DROP TYPE "public"."enum_pages_blocks_cta_band_cta_type";
  DROP TYPE "public"."enum_pages_blocks_cta_band_background";
  DROP TYPE "public"."enum__pages_v_blocks_product_steps_style";
  DROP TYPE "public"."enum__pages_v_blocks_product_grid_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_pillar_index_layout";
  DROP TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_layout";
  DROP TYPE "public"."enum__pages_v_blocks_split_hero_primary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_hero_secondary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_hero_background";
  DROP TYPE "public"."enum__pages_v_blocks_statement_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_background";`)
}
