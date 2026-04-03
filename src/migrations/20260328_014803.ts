import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sponsored_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_sponsored_articles_category" AS ENUM('outdoors', 'history', 'food', 'music', 'arts', 'family');
  CREATE TABLE "sponsored_articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_sponsored_articles_status" DEFAULT 'draft' NOT NULL,
  	"published_date" timestamp(3) with time zone,
  	"excerpt" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"body" jsonb NOT NULL,
  	"related_destination_id" integer,
  	"related_city_id" integer,
  	"related_region_id" integer,
  	"category" "enum_sponsored_articles_category",
  	"sponsor_name" varchar,
  	"sponsor_url" varchar,
  	"sponsor_logo_id" integer,
  	"is_editorial" boolean DEFAULT true,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"featured_on_advertise_page" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sponsored_articles_id" integer;
  ALTER TABLE "sponsored_articles" ADD CONSTRAINT "sponsored_articles_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsored_articles" ADD CONSTRAINT "sponsored_articles_related_destination_id_destinations_id_fk" FOREIGN KEY ("related_destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsored_articles" ADD CONSTRAINT "sponsored_articles_related_city_id_cities_id_fk" FOREIGN KEY ("related_city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsored_articles" ADD CONSTRAINT "sponsored_articles_related_region_id_regions_id_fk" FOREIGN KEY ("related_region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsored_articles" ADD CONSTRAINT "sponsored_articles_sponsor_logo_id_media_id_fk" FOREIGN KEY ("sponsor_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "sponsored_articles_slug_idx" ON "sponsored_articles" USING btree ("slug");
  CREATE INDEX "sponsored_articles_hero_image_idx" ON "sponsored_articles" USING btree ("hero_image_id");
  CREATE INDEX "sponsored_articles_related_destination_idx" ON "sponsored_articles" USING btree ("related_destination_id");
  CREATE INDEX "sponsored_articles_related_city_idx" ON "sponsored_articles" USING btree ("related_city_id");
  CREATE INDEX "sponsored_articles_related_region_idx" ON "sponsored_articles" USING btree ("related_region_id");
  CREATE INDEX "sponsored_articles_sponsor_logo_idx" ON "sponsored_articles" USING btree ("sponsor_logo_id");
  CREATE INDEX "sponsored_articles_updated_at_idx" ON "sponsored_articles" USING btree ("updated_at");
  CREATE INDEX "sponsored_articles_created_at_idx" ON "sponsored_articles" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sponsored_articles_fk" FOREIGN KEY ("sponsored_articles_id") REFERENCES "public"."sponsored_articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_sponsored_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("sponsored_articles_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sponsored_articles" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sponsored_articles" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sponsored_articles_fk";
  
  DROP INDEX "payload_locked_documents_rels_sponsored_articles_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sponsored_articles_id";
  DROP TYPE "public"."enum_sponsored_articles_status";
  DROP TYPE "public"."enum_sponsored_articles_category";`)
}
