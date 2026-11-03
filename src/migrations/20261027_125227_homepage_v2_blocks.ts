import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_category_grid_style" AS ENUM('cards', 'arches');
  CREATE TYPE "public"."enum_pages_blocks_editorial_hero_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_editorial_hero_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_marquee_background" AS ENUM('dark', 'cream', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_manifesto_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_pillar_index_items_icon" AS ENUM('leaf', 'star', 'flask', 'eye', 'heart', 'droplet', 'sparkles', 'shield', 'waves', 'atom', 'user', 'check', 'flower', 'hair', 'gem', 'ban');
  CREATE TYPE "public"."enum_pages_blocks_pillar_index_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_product_carousel_source" AS ENUM('all', 'featured', 'category', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_product_carousel_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_product_carousel_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_ingredient_spotlight_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_statement_cta_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_statement_cta_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_category_grid_style" AS ENUM('cards', 'arches');
  CREATE TYPE "public"."enum__pages_v_blocks_editorial_hero_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_editorial_hero_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_background" AS ENUM('dark', 'cream', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_manifesto_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_pillar_index_items_icon" AS ENUM('leaf', 'star', 'flask', 'eye', 'heart', 'droplet', 'sparkles', 'shield', 'waves', 'atom', 'user', 'check', 'flower', 'hair', 'gem', 'ban');
  CREATE TYPE "public"."enum__pages_v_blocks_pillar_index_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_product_carousel_source" AS ENUM('all', 'featured', 'category', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_product_carousel_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_product_carousel_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_cta_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_cta_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TABLE "pages_blocks_editorial_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"detail_image_id" integer,
  	"detail_caption" varchar,
  	"side_label" varchar,
  	"primary_cta_type" "enum_pages_blocks_editorial_hero_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum_pages_blocks_editorial_hero_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_marquee_background" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_manifesto_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"footnote" varchar,
  	"background" "enum_pages_blocks_manifesto_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pillar_index_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_pillar_index_items_icon" DEFAULT 'sparkles',
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_pillar_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"background" "enum_pages_blocks_pillar_index_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"source" "enum_pages_blocks_product_carousel_source" DEFAULT 'all',
  	"category_id" integer,
  	"limit" numeric DEFAULT 12,
  	"cta_type" "enum_pages_blocks_product_carousel_cta_type" DEFAULT 'internal',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"background" "enum_pages_blocks_product_carousel_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ingredient_spotlight_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"found_in" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ingredient_spotlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"background" "enum_pages_blocks_ingredient_spotlight_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"primary_cta_type" "enum_pages_blocks_statement_cta_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum_pages_blocks_statement_cta_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_editorial_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"detail_image_id" integer,
  	"detail_caption" varchar,
  	"side_label" varchar,
  	"primary_cta_type" "enum__pages_v_blocks_editorial_hero_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum__pages_v_blocks_editorial_hero_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_marquee_background" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_manifesto_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"footnote" varchar,
  	"background" "enum__pages_v_blocks_manifesto_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillar_index_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_pillar_index_items_icon" DEFAULT 'sparkles',
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillar_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"background" "enum__pages_v_blocks_pillar_index_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_product_carousel_source" DEFAULT 'all',
  	"category_id" integer,
  	"limit" numeric DEFAULT 12,
  	"cta_type" "enum__pages_v_blocks_product_carousel_cta_type" DEFAULT 'internal',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"background" "enum__pages_v_blocks_product_carousel_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ingredient_spotlight_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"found_in" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ingredient_spotlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"background" "enum__pages_v_blocks_ingredient_spotlight_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"primary_cta_type" "enum__pages_v_blocks_statement_cta_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum__pages_v_blocks_statement_cta_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_category_grid" ADD COLUMN "style" "enum_pages_blocks_category_grid_style" DEFAULT 'cards';
  ALTER TABLE "pages" ADD COLUMN "hide_from_search" boolean;
  ALTER TABLE "_pages_v_blocks_category_grid" ADD COLUMN "style" "enum__pages_v_blocks_category_grid_style" DEFAULT 'cards';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hide_from_search" boolean;
  ALTER TABLE "pages_blocks_editorial_hero" ADD CONSTRAINT "pages_blocks_editorial_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial_hero" ADD CONSTRAINT "pages_blocks_editorial_hero_detail_image_id_media_id_fk" FOREIGN KEY ("detail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial_hero" ADD CONSTRAINT "pages_blocks_editorial_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_items" ADD CONSTRAINT "pages_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto_lines" ADD CONSTRAINT "pages_blocks_manifesto_lines_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto_lines" ADD CONSTRAINT "pages_blocks_manifesto_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_manifesto" ADD CONSTRAINT "pages_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_index_items" ADD CONSTRAINT "pages_blocks_pillar_index_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillar_index"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_index" ADD CONSTRAINT "pages_blocks_pillar_index_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_index" ADD CONSTRAINT "pages_blocks_pillar_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_carousel" ADD CONSTRAINT "pages_blocks_product_carousel_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_carousel" ADD CONSTRAINT "pages_blocks_product_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ingredient_spotlight_items" ADD CONSTRAINT "pages_blocks_ingredient_spotlight_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ingredient_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ingredient_spotlight" ADD CONSTRAINT "pages_blocks_ingredient_spotlight_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ingredient_spotlight" ADD CONSTRAINT "pages_blocks_ingredient_spotlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_cta" ADD CONSTRAINT "pages_blocks_statement_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_cta" ADD CONSTRAINT "pages_blocks_statement_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial_hero" ADD CONSTRAINT "_pages_v_blocks_editorial_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial_hero" ADD CONSTRAINT "_pages_v_blocks_editorial_hero_detail_image_id_media_id_fk" FOREIGN KEY ("detail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial_hero" ADD CONSTRAINT "_pages_v_blocks_editorial_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_items" ADD CONSTRAINT "_pages_v_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto_lines" ADD CONSTRAINT "_pages_v_blocks_manifesto_lines_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto_lines" ADD CONSTRAINT "_pages_v_blocks_manifesto_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto" ADD CONSTRAINT "_pages_v_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_index_items" ADD CONSTRAINT "_pages_v_blocks_pillar_index_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillar_index"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_index" ADD CONSTRAINT "_pages_v_blocks_pillar_index_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_index" ADD CONSTRAINT "_pages_v_blocks_pillar_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_carousel" ADD CONSTRAINT "_pages_v_blocks_product_carousel_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_carousel" ADD CONSTRAINT "_pages_v_blocks_product_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight_items" ADD CONSTRAINT "_pages_v_blocks_ingredient_spotlight_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ingredient_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ADD CONSTRAINT "_pages_v_blocks_ingredient_spotlight_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ingredient_spotlight" ADD CONSTRAINT "_pages_v_blocks_ingredient_spotlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_cta" ADD CONSTRAINT "_pages_v_blocks_statement_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_cta" ADD CONSTRAINT "_pages_v_blocks_statement_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_editorial_hero_order_idx" ON "pages_blocks_editorial_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_editorial_hero_parent_id_idx" ON "pages_blocks_editorial_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_editorial_hero_path_idx" ON "pages_blocks_editorial_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_editorial_hero_image_idx" ON "pages_blocks_editorial_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_editorial_hero_detail_image_idx" ON "pages_blocks_editorial_hero" USING btree ("detail_image_id");
  CREATE INDEX "pages_blocks_marquee_items_order_idx" ON "pages_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_items_parent_id_idx" ON "pages_blocks_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_manifesto_lines_order_idx" ON "pages_blocks_manifesto_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_manifesto_lines_parent_id_idx" ON "pages_blocks_manifesto_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_manifesto_lines_image_idx" ON "pages_blocks_manifesto_lines" USING btree ("image_id");
  CREATE INDEX "pages_blocks_manifesto_order_idx" ON "pages_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "pages_blocks_manifesto_parent_id_idx" ON "pages_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_manifesto_path_idx" ON "pages_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "pages_blocks_pillar_index_items_order_idx" ON "pages_blocks_pillar_index_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillar_index_items_parent_id_idx" ON "pages_blocks_pillar_index_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillar_index_order_idx" ON "pages_blocks_pillar_index" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillar_index_parent_id_idx" ON "pages_blocks_pillar_index" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillar_index_path_idx" ON "pages_blocks_pillar_index" USING btree ("_path");
  CREATE INDEX "pages_blocks_pillar_index_image_idx" ON "pages_blocks_pillar_index" USING btree ("image_id");
  CREATE INDEX "pages_blocks_product_carousel_order_idx" ON "pages_blocks_product_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_carousel_parent_id_idx" ON "pages_blocks_product_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_carousel_path_idx" ON "pages_blocks_product_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_carousel_category_idx" ON "pages_blocks_product_carousel" USING btree ("category_id");
  CREATE INDEX "pages_blocks_ingredient_spotlight_items_order_idx" ON "pages_blocks_ingredient_spotlight_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ingredient_spotlight_items_parent_id_idx" ON "pages_blocks_ingredient_spotlight_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ingredient_spotlight_order_idx" ON "pages_blocks_ingredient_spotlight" USING btree ("_order");
  CREATE INDEX "pages_blocks_ingredient_spotlight_parent_id_idx" ON "pages_blocks_ingredient_spotlight" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ingredient_spotlight_path_idx" ON "pages_blocks_ingredient_spotlight" USING btree ("_path");
  CREATE INDEX "pages_blocks_ingredient_spotlight_image_idx" ON "pages_blocks_ingredient_spotlight" USING btree ("image_id");
  CREATE INDEX "pages_blocks_statement_cta_order_idx" ON "pages_blocks_statement_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_cta_parent_id_idx" ON "pages_blocks_statement_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_cta_path_idx" ON "pages_blocks_statement_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_cta_image_idx" ON "pages_blocks_statement_cta" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_editorial_hero_order_idx" ON "_pages_v_blocks_editorial_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_editorial_hero_parent_id_idx" ON "_pages_v_blocks_editorial_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_editorial_hero_path_idx" ON "_pages_v_blocks_editorial_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_editorial_hero_image_idx" ON "_pages_v_blocks_editorial_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_editorial_hero_detail_image_idx" ON "_pages_v_blocks_editorial_hero" USING btree ("detail_image_id");
  CREATE INDEX "_pages_v_blocks_marquee_items_order_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_items_parent_id_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_order_idx" ON "_pages_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_parent_id_idx" ON "_pages_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_path_idx" ON "_pages_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_manifesto_lines_order_idx" ON "_pages_v_blocks_manifesto_lines" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_manifesto_lines_parent_id_idx" ON "_pages_v_blocks_manifesto_lines" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_manifesto_lines_image_idx" ON "_pages_v_blocks_manifesto_lines" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_manifesto_order_idx" ON "_pages_v_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_manifesto_parent_id_idx" ON "_pages_v_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_manifesto_path_idx" ON "_pages_v_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pillar_index_items_order_idx" ON "_pages_v_blocks_pillar_index_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillar_index_items_parent_id_idx" ON "_pages_v_blocks_pillar_index_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillar_index_order_idx" ON "_pages_v_blocks_pillar_index" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillar_index_parent_id_idx" ON "_pages_v_blocks_pillar_index" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillar_index_path_idx" ON "_pages_v_blocks_pillar_index" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pillar_index_image_idx" ON "_pages_v_blocks_pillar_index" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_product_carousel_order_idx" ON "_pages_v_blocks_product_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_carousel_parent_id_idx" ON "_pages_v_blocks_product_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_carousel_path_idx" ON "_pages_v_blocks_product_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_carousel_category_idx" ON "_pages_v_blocks_product_carousel" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_ingredient_spotlight_items_order_idx" ON "_pages_v_blocks_ingredient_spotlight_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ingredient_spotlight_items_parent_id_idx" ON "_pages_v_blocks_ingredient_spotlight_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ingredient_spotlight_order_idx" ON "_pages_v_blocks_ingredient_spotlight" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ingredient_spotlight_parent_id_idx" ON "_pages_v_blocks_ingredient_spotlight" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ingredient_spotlight_path_idx" ON "_pages_v_blocks_ingredient_spotlight" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ingredient_spotlight_image_idx" ON "_pages_v_blocks_ingredient_spotlight" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_statement_cta_order_idx" ON "_pages_v_blocks_statement_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_cta_parent_id_idx" ON "_pages_v_blocks_statement_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_cta_path_idx" ON "_pages_v_blocks_statement_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_cta_image_idx" ON "_pages_v_blocks_statement_cta" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_editorial_hero" CASCADE;
  DROP TABLE "pages_blocks_marquee_items" CASCADE;
  DROP TABLE "pages_blocks_marquee" CASCADE;
  DROP TABLE "pages_blocks_manifesto_lines" CASCADE;
  DROP TABLE "pages_blocks_manifesto" CASCADE;
  DROP TABLE "pages_blocks_pillar_index_items" CASCADE;
  DROP TABLE "pages_blocks_pillar_index" CASCADE;
  DROP TABLE "pages_blocks_product_carousel" CASCADE;
  DROP TABLE "pages_blocks_ingredient_spotlight_items" CASCADE;
  DROP TABLE "pages_blocks_ingredient_spotlight" CASCADE;
  DROP TABLE "pages_blocks_statement_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_editorial_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_manifesto_lines" CASCADE;
  DROP TABLE "_pages_v_blocks_manifesto" CASCADE;
  DROP TABLE "_pages_v_blocks_pillar_index_items" CASCADE;
  DROP TABLE "_pages_v_blocks_pillar_index" CASCADE;
  DROP TABLE "_pages_v_blocks_product_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_ingredient_spotlight_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ingredient_spotlight" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_cta" CASCADE;
  ALTER TABLE "pages_blocks_category_grid" DROP COLUMN "style";
  ALTER TABLE "pages" DROP COLUMN "hide_from_search";
  ALTER TABLE "_pages_v_blocks_category_grid" DROP COLUMN "style";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hide_from_search";
  DROP TYPE "public"."enum_pages_blocks_category_grid_style";
  DROP TYPE "public"."enum_pages_blocks_editorial_hero_primary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_editorial_hero_secondary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_marquee_background";
  DROP TYPE "public"."enum_pages_blocks_manifesto_background";
  DROP TYPE "public"."enum_pages_blocks_pillar_index_items_icon";
  DROP TYPE "public"."enum_pages_blocks_pillar_index_background";
  DROP TYPE "public"."enum_pages_blocks_product_carousel_source";
  DROP TYPE "public"."enum_pages_blocks_product_carousel_cta_type";
  DROP TYPE "public"."enum_pages_blocks_product_carousel_background";
  DROP TYPE "public"."enum_pages_blocks_ingredient_spotlight_background";
  DROP TYPE "public"."enum_pages_blocks_statement_cta_primary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_statement_cta_secondary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_category_grid_style";
  DROP TYPE "public"."enum__pages_v_blocks_editorial_hero_primary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_editorial_hero_secondary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_background";
  DROP TYPE "public"."enum__pages_v_blocks_manifesto_background";
  DROP TYPE "public"."enum__pages_v_blocks_pillar_index_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_pillar_index_background";
  DROP TYPE "public"."enum__pages_v_blocks_product_carousel_source";
  DROP TYPE "public"."enum__pages_v_blocks_product_carousel_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_product_carousel_background";
  DROP TYPE "public"."enum__pages_v_blocks_ingredient_spotlight_background";
  DROP TYPE "public"."enum__pages_v_blocks_statement_cta_primary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_statement_cta_secondary_cta_type";`)
}
