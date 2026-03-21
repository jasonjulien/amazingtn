import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_restaurants_cuisine" ADD VALUE 'steakhouse' BEFORE 'other';
  ALTER TYPE "public"."enum_restaurants_cuisine" ADD VALUE 'breakfast-brunch' BEFORE 'other';
  ALTER TYPE "public"."enum_restaurants_cuisine" ADD VALUE 'burgers-sandwiches' BEFORE 'other';
  ALTER TYPE "public"."enum_restaurants_cuisine" ADD VALUE 'pizza' BEFORE 'other';
  ALTER TYPE "public"."enum_restaurants_cuisine" ADD VALUE 'vegetarian-vegan' BEFORE 'other';
  ALTER TYPE "public"."enum_restaurants_cuisine" ADD VALUE 'bar-gastropub' BEFORE 'other';
  CREATE TABLE "restaurants_cuisine" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_restaurants_cuisine",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "restaurants_cuisine" ADD CONSTRAINT "restaurants_cuisine_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "restaurants_cuisine_order_idx" ON "restaurants_cuisine" USING btree ("order");
  CREATE INDEX "restaurants_cuisine_parent_idx" ON "restaurants_cuisine" USING btree ("parent_id");
  ALTER TABLE "restaurants" DROP COLUMN "cuisine";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "restaurants_cuisine" CASCADE;
  ALTER TABLE "restaurants" ALTER COLUMN "cuisine" SET DATA TYPE text;
  DROP TYPE "public"."enum_restaurants_cuisine";
  CREATE TYPE "public"."enum_restaurants_cuisine" AS ENUM('american', 'bbq', 'southern', 'italian', 'mexican', 'seafood', 'asian', 'french', 'mediterranean', 'other');
  ALTER TABLE "restaurants" ALTER COLUMN "cuisine" SET DATA TYPE "public"."enum_restaurants_cuisine" USING "cuisine"::"public"."enum_restaurants_cuisine";
  ALTER TABLE "restaurants" ADD COLUMN "cuisine" "enum_restaurants_cuisine";`)
}
