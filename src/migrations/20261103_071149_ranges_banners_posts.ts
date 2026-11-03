import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_banners_placement" AS ENUM('hero', 'offer');
  CREATE TYPE "public"."enum_pages_blocks_range_grid_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_form_type" AS ENUM('customer', 'partner');
  CREATE TYPE "public"."enum_pages_blocks_company_details_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_banners_placement" AS ENUM('hero', 'offer');
  CREATE TYPE "public"."enum__pages_v_blocks_range_grid_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_form_type" AS ENUM('customer', 'partner');
  CREATE TYPE "public"."enum__pages_v_blocks_company_details_background" AS ENUM('white', 'cream', 'lavender', 'dark');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_banners_placement" AS ENUM('hero', 'offer');
  CREATE TYPE "public"."enum_banners_image_position" AS ENUM('center', 'top', 'right', 'left');
  CREATE TYPE "public"."enum_banners_primary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_banners_secondary_cta_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_products_free_from" AS ENUM('sulfate', 'paraben', 'formaldehyde', 'colophony');
  CREATE TYPE "public"."enum_products_audience" AS ENUM('salon', 'home');
  CREATE TYPE "public"."enum_products_concerns" AS ENUM('smoothing', 'repair', 'shine', 'cleansing', 'skin-glow', 'hair-removal');
  CREATE TYPE "public"."enum__products_v_version_free_from" AS ENUM('sulfate', 'paraben', 'formaldehyde', 'colophony');
  CREATE TYPE "public"."enum__products_v_version_audience" AS ENUM('salon', 'home');
  CREATE TYPE "public"."enum__products_v_version_concerns" AS ENUM('smoothing', 'repair', 'shine', 'cleansing', 'skin-glow', 'hair-removal');
  CREATE TYPE "public"."enum_ranges_audience" AS ENUM('salon', 'home');
  CREATE TYPE "public"."enum_inquiries_kind" AS ENUM('customer', 'partner');
  CREATE TYPE "public"."enum_inquiries_partner_type" AS ENUM('salon', 'distributor');
  CREATE TYPE "public"."enum_header_nav_items_sub_links_link_type" AS ENUM('internal', 'custom');
  ALTER TYPE "public"."enum_pages_blocks_product_grid_source" ADD VALUE 'range' BEFORE 'category';
  ALTER TYPE "public"."enum_pages_blocks_product_carousel_source" ADD VALUE 'range' BEFORE 'category';
  ALTER TYPE "public"."enum__pages_v_blocks_product_grid_source" ADD VALUE 'range' BEFORE 'category';
  ALTER TYPE "public"."enum__pages_v_blocks_product_carousel_source" ADD VALUE 'range' BEFORE 'category';
  CREATE TABLE "pages_blocks_banners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"placement" "enum_pages_blocks_banners_placement" DEFAULT 'hero',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_range_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"background" "enum_pages_blocks_range_grid_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_company_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"background" "enum_pages_blocks_company_details_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"placement" "enum__pages_v_blocks_banners_placement" DEFAULT 'hero',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_range_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"background" "enum__pages_v_blocks_range_grid_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_company_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"background" "enum__pages_v_blocks_company_details_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"author" varchar DEFAULT 'SELESTIN Professional',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_author" varchar DEFAULT 'SELESTIN Professional',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"placement" "enum_banners_placement" DEFAULT 'hero' NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"image_id" integer NOT NULL,
  	"image_position" "enum_banners_image_position" DEFAULT 'center',
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"heading_accent" varchar,
  	"text" varchar,
  	"primary_cta_type" "enum_banners_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_new_tab" boolean,
  	"primary_cta_url" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_type" "enum_banners_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_new_tab" boolean,
  	"secondary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"active" boolean DEFAULT true,
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "banners_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"products_id" integer,
  	"product_categories_id" integer,
  	"ranges_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "products_free_from" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_products_free_from",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_before_after" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_id" integer,
  	"after_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "products_audience" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_products_audience",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_concerns" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_products_concerns",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_products_v_version_free_from" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__products_v_version_free_from",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_products_v_version_before_after" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"before_id" integer,
  	"after_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_audience" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__products_v_version_audience",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_products_v_version_concerns" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__products_v_version_concerns",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ranges_audience" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_ranges_audience",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ranges" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"tagline" varchar,
  	"summary" varchar,
  	"story" jsonb,
  	"image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_sub_links_link_type" DEFAULT 'internal',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "inquiries" ALTER COLUMN "enquiry_type" SET DEFAULT 'product';
  ALTER TABLE "pages_blocks_product_grid" ADD COLUMN "range_id" integer;
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "form_type" "enum_pages_blocks_contact_section_form_type" DEFAULT 'customer';
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "show_contact_details" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "show_map" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_product_carousel" ADD COLUMN "range_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "ranges_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_pages_v_blocks_product_grid" ADD COLUMN "range_id" integer;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "form_type" "enum__pages_v_blocks_contact_section_form_type" DEFAULT 'customer';
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "show_contact_details" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "show_map" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_product_carousel" ADD COLUMN "range_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "ranges_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "products" ADD COLUMN "professional_only" boolean;
  ALTER TABLE "products" ADD COLUMN "range_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_professional_only" boolean;
  ALTER TABLE "_products_v" ADD COLUMN "version_range_id" integer;
  ALTER TABLE "inquiries" ADD COLUMN "kind" "enum_inquiries_kind" DEFAULT 'customer' NOT NULL;
  ALTER TABLE "inquiries" ADD COLUMN "partner_type" "enum_inquiries_partner_type";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "banners_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ranges_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "whatsapp" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "map_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "google_analytics_id" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "search_console_verification" varchar;
  ALTER TABLE "header_rels" ADD COLUMN "ranges_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "ranges_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "pages_blocks_banners" ADD CONSTRAINT "pages_blocks_banners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_range_grid" ADD CONSTRAINT "pages_blocks_range_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_company_details" ADD CONSTRAINT "pages_blocks_company_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banners" ADD CONSTRAINT "_pages_v_blocks_banners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_range_grid" ADD CONSTRAINT "_pages_v_blocks_range_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_company_details" ADD CONSTRAINT "_pages_v_blocks_company_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "banners" ADD CONSTRAINT "banners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "banners_rels" ADD CONSTRAINT "banners_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "banners_rels" ADD CONSTRAINT "banners_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "banners_rels" ADD CONSTRAINT "banners_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "banners_rels" ADD CONSTRAINT "banners_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "banners_rels" ADD CONSTRAINT "banners_rels_ranges_fk" FOREIGN KEY ("ranges_id") REFERENCES "public"."ranges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "banners_rels" ADD CONSTRAINT "banners_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_free_from" ADD CONSTRAINT "products_free_from_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_before_after" ADD CONSTRAINT "products_before_after_before_id_media_id_fk" FOREIGN KEY ("before_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_before_after" ADD CONSTRAINT "products_before_after_after_id_media_id_fk" FOREIGN KEY ("after_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_before_after" ADD CONSTRAINT "products_before_after_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_audience" ADD CONSTRAINT "products_audience_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_concerns" ADD CONSTRAINT "products_concerns_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_free_from" ADD CONSTRAINT "_products_v_version_free_from_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_before_after" ADD CONSTRAINT "_products_v_version_before_after_before_id_media_id_fk" FOREIGN KEY ("before_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_before_after" ADD CONSTRAINT "_products_v_version_before_after_after_id_media_id_fk" FOREIGN KEY ("after_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_before_after" ADD CONSTRAINT "_products_v_version_before_after_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_audience" ADD CONSTRAINT "_products_v_version_audience_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_concerns" ADD CONSTRAINT "_products_v_version_concerns_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ranges_audience" ADD CONSTRAINT "ranges_audience_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ranges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ranges" ADD CONSTRAINT "ranges_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ranges" ADD CONSTRAINT "ranges_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_links" ADD CONSTRAINT "header_nav_items_sub_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_banners_order_idx" ON "pages_blocks_banners" USING btree ("_order");
  CREATE INDEX "pages_blocks_banners_parent_id_idx" ON "pages_blocks_banners" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banners_path_idx" ON "pages_blocks_banners" USING btree ("_path");
  CREATE INDEX "pages_blocks_range_grid_order_idx" ON "pages_blocks_range_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_range_grid_parent_id_idx" ON "pages_blocks_range_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_range_grid_path_idx" ON "pages_blocks_range_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_company_details_order_idx" ON "pages_blocks_company_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_company_details_parent_id_idx" ON "pages_blocks_company_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_company_details_path_idx" ON "pages_blocks_company_details" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banners_order_idx" ON "_pages_v_blocks_banners" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banners_parent_id_idx" ON "_pages_v_blocks_banners" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banners_path_idx" ON "_pages_v_blocks_banners" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_range_grid_order_idx" ON "_pages_v_blocks_range_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_range_grid_parent_id_idx" ON "_pages_v_blocks_range_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_range_grid_path_idx" ON "_pages_v_blocks_range_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_company_details_order_idx" ON "_pages_v_blocks_company_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_company_details_parent_id_idx" ON "_pages_v_blocks_company_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_company_details_path_idx" ON "_pages_v_blocks_company_details" USING btree ("_path");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "banners_image_idx" ON "banners" USING btree ("image_id");
  CREATE INDEX "banners_updated_at_idx" ON "banners" USING btree ("updated_at");
  CREATE INDEX "banners_created_at_idx" ON "banners" USING btree ("created_at");
  CREATE INDEX "banners_rels_order_idx" ON "banners_rels" USING btree ("order");
  CREATE INDEX "banners_rels_parent_idx" ON "banners_rels" USING btree ("parent_id");
  CREATE INDEX "banners_rels_path_idx" ON "banners_rels" USING btree ("path");
  CREATE INDEX "banners_rels_pages_id_idx" ON "banners_rels" USING btree ("pages_id");
  CREATE INDEX "banners_rels_products_id_idx" ON "banners_rels" USING btree ("products_id");
  CREATE INDEX "banners_rels_product_categories_id_idx" ON "banners_rels" USING btree ("product_categories_id");
  CREATE INDEX "banners_rels_ranges_id_idx" ON "banners_rels" USING btree ("ranges_id");
  CREATE INDEX "banners_rels_posts_id_idx" ON "banners_rels" USING btree ("posts_id");
  CREATE INDEX "products_free_from_order_idx" ON "products_free_from" USING btree ("order");
  CREATE INDEX "products_free_from_parent_idx" ON "products_free_from" USING btree ("parent_id");
  CREATE INDEX "products_before_after_order_idx" ON "products_before_after" USING btree ("_order");
  CREATE INDEX "products_before_after_parent_id_idx" ON "products_before_after" USING btree ("_parent_id");
  CREATE INDEX "products_before_after_before_idx" ON "products_before_after" USING btree ("before_id");
  CREATE INDEX "products_before_after_after_idx" ON "products_before_after" USING btree ("after_id");
  CREATE INDEX "products_audience_order_idx" ON "products_audience" USING btree ("order");
  CREATE INDEX "products_audience_parent_idx" ON "products_audience" USING btree ("parent_id");
  CREATE INDEX "products_concerns_order_idx" ON "products_concerns" USING btree ("order");
  CREATE INDEX "products_concerns_parent_idx" ON "products_concerns" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_free_from_order_idx" ON "_products_v_version_free_from" USING btree ("order");
  CREATE INDEX "_products_v_version_free_from_parent_idx" ON "_products_v_version_free_from" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_before_after_order_idx" ON "_products_v_version_before_after" USING btree ("_order");
  CREATE INDEX "_products_v_version_before_after_parent_id_idx" ON "_products_v_version_before_after" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_before_after_before_idx" ON "_products_v_version_before_after" USING btree ("before_id");
  CREATE INDEX "_products_v_version_before_after_after_idx" ON "_products_v_version_before_after" USING btree ("after_id");
  CREATE INDEX "_products_v_version_audience_order_idx" ON "_products_v_version_audience" USING btree ("order");
  CREATE INDEX "_products_v_version_audience_parent_idx" ON "_products_v_version_audience" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_concerns_order_idx" ON "_products_v_version_concerns" USING btree ("order");
  CREATE INDEX "_products_v_version_concerns_parent_idx" ON "_products_v_version_concerns" USING btree ("parent_id");
  CREATE INDEX "ranges_audience_order_idx" ON "ranges_audience" USING btree ("order");
  CREATE INDEX "ranges_audience_parent_idx" ON "ranges_audience" USING btree ("parent_id");
  CREATE INDEX "ranges_image_idx" ON "ranges" USING btree ("image_id");
  CREATE INDEX "ranges_meta_meta_image_idx" ON "ranges" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "ranges_slug_idx" ON "ranges" USING btree ("slug");
  CREATE INDEX "ranges_updated_at_idx" ON "ranges" USING btree ("updated_at");
  CREATE INDEX "ranges_created_at_idx" ON "ranges" USING btree ("created_at");
  CREATE INDEX "header_nav_items_sub_links_order_idx" ON "header_nav_items_sub_links" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_links_parent_id_idx" ON "header_nav_items_sub_links" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_product_grid" ADD CONSTRAINT "pages_blocks_product_grid_range_id_ranges_id_fk" FOREIGN KEY ("range_id") REFERENCES "public"."ranges"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_carousel" ADD CONSTRAINT "pages_blocks_product_carousel_range_id_ranges_id_fk" FOREIGN KEY ("range_id") REFERENCES "public"."ranges"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_ranges_fk" FOREIGN KEY ("ranges_id") REFERENCES "public"."ranges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_grid" ADD CONSTRAINT "_pages_v_blocks_product_grid_range_id_ranges_id_fk" FOREIGN KEY ("range_id") REFERENCES "public"."ranges"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_carousel" ADD CONSTRAINT "_pages_v_blocks_product_carousel_range_id_ranges_id_fk" FOREIGN KEY ("range_id") REFERENCES "public"."ranges"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_ranges_fk" FOREIGN KEY ("ranges_id") REFERENCES "public"."ranges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_range_id_ranges_id_fk" FOREIGN KEY ("range_id") REFERENCES "public"."ranges"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_range_id_ranges_id_fk" FOREIGN KEY ("version_range_id") REFERENCES "public"."ranges"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_banners_fk" FOREIGN KEY ("banners_id") REFERENCES "public"."banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ranges_fk" FOREIGN KEY ("ranges_id") REFERENCES "public"."ranges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_ranges_fk" FOREIGN KEY ("ranges_id") REFERENCES "public"."ranges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_ranges_fk" FOREIGN KEY ("ranges_id") REFERENCES "public"."ranges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_product_grid_range_idx" ON "pages_blocks_product_grid" USING btree ("range_id");
  CREATE INDEX "pages_blocks_product_carousel_range_idx" ON "pages_blocks_product_carousel" USING btree ("range_id");
  CREATE INDEX "pages_rels_ranges_id_idx" ON "pages_rels" USING btree ("ranges_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_blocks_product_grid_range_idx" ON "_pages_v_blocks_product_grid" USING btree ("range_id");
  CREATE INDEX "_pages_v_blocks_product_carousel_range_idx" ON "_pages_v_blocks_product_carousel" USING btree ("range_id");
  CREATE INDEX "_pages_v_rels_ranges_id_idx" ON "_pages_v_rels" USING btree ("ranges_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "products_range_idx" ON "products" USING btree ("range_id");
  CREATE INDEX "_products_v_version_version_range_idx" ON "_products_v" USING btree ("version_range_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_banners_id_idx" ON "payload_locked_documents_rels" USING btree ("banners_id");
  CREATE INDEX "payload_locked_documents_rels_ranges_id_idx" ON "payload_locked_documents_rels" USING btree ("ranges_id");
  CREATE INDEX "header_rels_ranges_id_idx" ON "header_rels" USING btree ("ranges_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_ranges_id_idx" ON "footer_rels" USING btree ("ranges_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_banners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_range_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_company_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_banners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_range_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_company_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "banners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "banners_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_free_from" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_before_after" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_concerns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_free_from" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_before_after" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_concerns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ranges_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ranges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_sub_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_banners" CASCADE;
  DROP TABLE "pages_blocks_range_grid" CASCADE;
  DROP TABLE "pages_blocks_company_details" CASCADE;
  DROP TABLE "_pages_v_blocks_banners" CASCADE;
  DROP TABLE "_pages_v_blocks_range_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_company_details" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "banners" CASCADE;
  DROP TABLE "banners_rels" CASCADE;
  DROP TABLE "products_free_from" CASCADE;
  DROP TABLE "products_before_after" CASCADE;
  DROP TABLE "products_audience" CASCADE;
  DROP TABLE "products_concerns" CASCADE;
  DROP TABLE "_products_v_version_free_from" CASCADE;
  DROP TABLE "_products_v_version_before_after" CASCADE;
  DROP TABLE "_products_v_version_audience" CASCADE;
  DROP TABLE "_products_v_version_concerns" CASCADE;
  DROP TABLE "ranges_audience" CASCADE;
  DROP TABLE "ranges" CASCADE;
  DROP TABLE "header_nav_items_sub_links" CASCADE;
  ALTER TABLE "pages_blocks_product_grid" DROP CONSTRAINT "pages_blocks_product_grid_range_id_ranges_id_fk";
  
  ALTER TABLE "pages_blocks_product_carousel" DROP CONSTRAINT "pages_blocks_product_carousel_range_id_ranges_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_ranges_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  ALTER TABLE "_pages_v_blocks_product_grid" DROP CONSTRAINT "_pages_v_blocks_product_grid_range_id_ranges_id_fk";
  
  ALTER TABLE "_pages_v_blocks_product_carousel" DROP CONSTRAINT "_pages_v_blocks_product_carousel_range_id_ranges_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_ranges_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_posts_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_range_id_ranges_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_range_id_ranges_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_banners_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ranges_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_ranges_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_posts_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_ranges_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_posts_fk";
  
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "source" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "source" SET DEFAULT 'featured'::text;
  DROP TYPE "public"."enum_pages_blocks_product_grid_source";
  CREATE TYPE "public"."enum_pages_blocks_product_grid_source" AS ENUM('featured', 'category', 'manual', 'all');
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "source" SET DEFAULT 'featured'::"public"."enum_pages_blocks_product_grid_source";
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "source" SET DATA TYPE "public"."enum_pages_blocks_product_grid_source" USING "source"::"public"."enum_pages_blocks_product_grid_source";
  ALTER TABLE "pages_blocks_product_carousel" ALTER COLUMN "source" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_carousel" ALTER COLUMN "source" SET DEFAULT 'all'::text;
  DROP TYPE "public"."enum_pages_blocks_product_carousel_source";
  CREATE TYPE "public"."enum_pages_blocks_product_carousel_source" AS ENUM('all', 'featured', 'category', 'manual');
  ALTER TABLE "pages_blocks_product_carousel" ALTER COLUMN "source" SET DEFAULT 'all'::"public"."enum_pages_blocks_product_carousel_source";
  ALTER TABLE "pages_blocks_product_carousel" ALTER COLUMN "source" SET DATA TYPE "public"."enum_pages_blocks_product_carousel_source" USING "source"::"public"."enum_pages_blocks_product_carousel_source";
  ALTER TABLE "_pages_v_blocks_product_grid" ALTER COLUMN "source" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_grid" ALTER COLUMN "source" SET DEFAULT 'featured'::text;
  DROP TYPE "public"."enum__pages_v_blocks_product_grid_source";
  CREATE TYPE "public"."enum__pages_v_blocks_product_grid_source" AS ENUM('featured', 'category', 'manual', 'all');
  ALTER TABLE "_pages_v_blocks_product_grid" ALTER COLUMN "source" SET DEFAULT 'featured'::"public"."enum__pages_v_blocks_product_grid_source";
  ALTER TABLE "_pages_v_blocks_product_grid" ALTER COLUMN "source" SET DATA TYPE "public"."enum__pages_v_blocks_product_grid_source" USING "source"::"public"."enum__pages_v_blocks_product_grid_source";
  ALTER TABLE "_pages_v_blocks_product_carousel" ALTER COLUMN "source" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_carousel" ALTER COLUMN "source" SET DEFAULT 'all'::text;
  DROP TYPE "public"."enum__pages_v_blocks_product_carousel_source";
  CREATE TYPE "public"."enum__pages_v_blocks_product_carousel_source" AS ENUM('all', 'featured', 'category', 'manual');
  ALTER TABLE "_pages_v_blocks_product_carousel" ALTER COLUMN "source" SET DEFAULT 'all'::"public"."enum__pages_v_blocks_product_carousel_source";
  ALTER TABLE "_pages_v_blocks_product_carousel" ALTER COLUMN "source" SET DATA TYPE "public"."enum__pages_v_blocks_product_carousel_source" USING "source"::"public"."enum__pages_v_blocks_product_carousel_source";
  DROP INDEX "pages_blocks_product_grid_range_idx";
  DROP INDEX "pages_blocks_product_carousel_range_idx";
  DROP INDEX "pages_rels_ranges_id_idx";
  DROP INDEX "pages_rels_posts_id_idx";
  DROP INDEX "_pages_v_blocks_product_grid_range_idx";
  DROP INDEX "_pages_v_blocks_product_carousel_range_idx";
  DROP INDEX "_pages_v_rels_ranges_id_idx";
  DROP INDEX "_pages_v_rels_posts_id_idx";
  DROP INDEX "products_range_idx";
  DROP INDEX "_products_v_version_version_range_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_banners_id_idx";
  DROP INDEX "payload_locked_documents_rels_ranges_id_idx";
  DROP INDEX "header_rels_ranges_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "footer_rels_ranges_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  ALTER TABLE "inquiries" ALTER COLUMN "enquiry_type" SET DEFAULT 'partnership';
  ALTER TABLE "pages_blocks_product_grid" DROP COLUMN "range_id";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "form_type";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "show_contact_details";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "show_map";
  ALTER TABLE "pages_blocks_product_carousel" DROP COLUMN "range_id";
  ALTER TABLE "pages_rels" DROP COLUMN "ranges_id";
  ALTER TABLE "pages_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_pages_v_blocks_product_grid" DROP COLUMN "range_id";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "form_type";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "show_contact_details";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "show_map";
  ALTER TABLE "_pages_v_blocks_product_carousel" DROP COLUMN "range_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "ranges_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "products" DROP COLUMN "professional_only";
  ALTER TABLE "products" DROP COLUMN "range_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_professional_only";
  ALTER TABLE "_products_v" DROP COLUMN "version_range_id";
  ALTER TABLE "inquiries" DROP COLUMN "kind";
  ALTER TABLE "inquiries" DROP COLUMN "partner_type";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "banners_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ranges_id";
  ALTER TABLE "site_settings" DROP COLUMN "whatsapp";
  ALTER TABLE "site_settings" DROP COLUMN "map_url";
  ALTER TABLE "site_settings" DROP COLUMN "google_analytics_id";
  ALTER TABLE "site_settings" DROP COLUMN "search_console_verification";
  ALTER TABLE "header_rels" DROP COLUMN "ranges_id";
  ALTER TABLE "header_rels" DROP COLUMN "posts_id";
  ALTER TABLE "footer_rels" DROP COLUMN "ranges_id";
  ALTER TABLE "footer_rels" DROP COLUMN "posts_id";
  DROP TYPE "public"."enum_pages_blocks_banners_placement";
  DROP TYPE "public"."enum_pages_blocks_range_grid_background";
  DROP TYPE "public"."enum_pages_blocks_contact_section_form_type";
  DROP TYPE "public"."enum_pages_blocks_company_details_background";
  DROP TYPE "public"."enum__pages_v_blocks_banners_placement";
  DROP TYPE "public"."enum__pages_v_blocks_range_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_form_type";
  DROP TYPE "public"."enum__pages_v_blocks_company_details_background";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_banners_placement";
  DROP TYPE "public"."enum_banners_image_position";
  DROP TYPE "public"."enum_banners_primary_cta_type";
  DROP TYPE "public"."enum_banners_secondary_cta_type";
  DROP TYPE "public"."enum_products_free_from";
  DROP TYPE "public"."enum_products_audience";
  DROP TYPE "public"."enum_products_concerns";
  DROP TYPE "public"."enum__products_v_version_free_from";
  DROP TYPE "public"."enum__products_v_version_audience";
  DROP TYPE "public"."enum__products_v_version_concerns";
  DROP TYPE "public"."enum_ranges_audience";
  DROP TYPE "public"."enum_inquiries_kind";
  DROP TYPE "public"."enum_inquiries_partner_type";
  DROP TYPE "public"."enum_header_nav_items_sub_links_link_type";`)
}
