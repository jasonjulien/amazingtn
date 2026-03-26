import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sponsors_tier" AS ENUM('basic', 'featured', 'premier');
  CREATE TYPE "public"."enum_sponsors_linked_type" AS ENUM('restaurant', 'destination', 'event', 'city');
  CREATE TYPE "public"."enum_sponsors_status" AS ENUM('pending', 'active', 'expired', 'cancelled');
  CREATE TABLE "sponsors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"business_name" varchar NOT NULL,
  	"contact_name" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"contact_phone" varchar,
  	"website" varchar,
  	"tier" "enum_sponsors_tier" NOT NULL,
  	"linked_type" "enum_sponsors_linked_type" NOT NULL,
  	"linked_restaurant_id" integer,
  	"linked_destination_id" integer,
  	"status" "enum_sponsors_status" DEFAULT 'pending' NOT NULL,
  	"starts_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone,
  	"stripe_customer_id" varchar,
  	"stripe_subscription_id" varchar,
  	"stripe_checkout_session_id" varchar,
  	"featured_image_id" integer,
  	"tagline" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sponsors_id" integer;
  ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_linked_restaurant_id_restaurants_id_fk" FOREIGN KEY ("linked_restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_linked_destination_id_destinations_id_fk" FOREIGN KEY ("linked_destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sponsors_linked_restaurant_idx" ON "sponsors" USING btree ("linked_restaurant_id");
  CREATE INDEX "sponsors_linked_destination_idx" ON "sponsors" USING btree ("linked_destination_id");
  CREATE INDEX "sponsors_featured_image_idx" ON "sponsors" USING btree ("featured_image_id");
  CREATE INDEX "sponsors_updated_at_idx" ON "sponsors" USING btree ("updated_at");
  CREATE INDEX "sponsors_created_at_idx" ON "sponsors" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_sponsors_id_idx" ON "payload_locked_documents_rels" USING btree ("sponsors_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sponsors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sponsors" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sponsors_fk";
  
  DROP INDEX "payload_locked_documents_rels_sponsors_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sponsors_id";
  DROP TYPE "public"."enum_sponsors_tier";
  DROP TYPE "public"."enum_sponsors_linked_type";
  DROP TYPE "public"."enum_sponsors_status";`)
}
