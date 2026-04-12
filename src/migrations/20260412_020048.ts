import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sponsored_articles" DROP CONSTRAINT "sponsored_articles_hero_image_id_media_id_fk";
  
  DROP INDEX "sponsored_articles_hero_image_idx";
  ALTER TABLE "sponsored_articles" ADD COLUMN "hero_image" varchar;
  ALTER TABLE "sponsored_articles" DROP COLUMN "hero_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sponsored_articles" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "sponsored_articles" ADD CONSTRAINT "sponsored_articles_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sponsored_articles_hero_image_idx" ON "sponsored_articles" USING btree ("hero_image_id");
  ALTER TABLE "sponsored_articles" DROP COLUMN "hero_image";`)
}
