import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sponsored_articles" ALTER COLUMN "hero_image_id" DROP NOT NULL;
  ALTER TABLE "media" ADD COLUMN "credit" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sponsored_articles" ALTER COLUMN "hero_image_id" SET NOT NULL;
  ALTER TABLE "media" DROP COLUMN "credit";`)
}
