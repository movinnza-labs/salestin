import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_products_free_from" ADD VALUE 'chloride';
  ALTER TYPE "public"."enum_products_free_from" ADD VALUE 'phthalates';
  ALTER TYPE "public"."enum_products_free_from" ADD VALUE 'dea-tea';
  ALTER TYPE "public"."enum_products_concerns" ADD VALUE 'lightening' BEFORE 'skin-glow';
  ALTER TYPE "public"."enum__products_v_version_free_from" ADD VALUE 'chloride';
  ALTER TYPE "public"."enum__products_v_version_free_from" ADD VALUE 'phthalates';
  ALTER TYPE "public"."enum__products_v_version_free_from" ADD VALUE 'dea-tea';
  ALTER TYPE "public"."enum__products_v_version_concerns" ADD VALUE 'lightening' BEFORE 'skin-glow';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_free_from" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_products_free_from";
  CREATE TYPE "public"."enum_products_free_from" AS ENUM('sulfate', 'paraben', 'formaldehyde', 'colophony');
  ALTER TABLE "products_free_from" ALTER COLUMN "value" SET DATA TYPE "public"."enum_products_free_from" USING "value"::"public"."enum_products_free_from";
  ALTER TABLE "products_concerns" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_products_concerns";
  CREATE TYPE "public"."enum_products_concerns" AS ENUM('smoothing', 'repair', 'shine', 'cleansing', 'skin-glow', 'hair-removal');
  ALTER TABLE "products_concerns" ALTER COLUMN "value" SET DATA TYPE "public"."enum_products_concerns" USING "value"::"public"."enum_products_concerns";
  ALTER TABLE "_products_v_version_free_from" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__products_v_version_free_from";
  CREATE TYPE "public"."enum__products_v_version_free_from" AS ENUM('sulfate', 'paraben', 'formaldehyde', 'colophony');
  ALTER TABLE "_products_v_version_free_from" ALTER COLUMN "value" SET DATA TYPE "public"."enum__products_v_version_free_from" USING "value"::"public"."enum__products_v_version_free_from";
  ALTER TABLE "_products_v_version_concerns" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__products_v_version_concerns";
  CREATE TYPE "public"."enum__products_v_version_concerns" AS ENUM('smoothing', 'repair', 'shine', 'cleansing', 'skin-glow', 'hair-removal');
  ALTER TABLE "_products_v_version_concerns" ALTER COLUMN "value" SET DATA TYPE "public"."enum__products_v_version_concerns" USING "value"::"public"."enum__products_v_version_concerns";`)
}
