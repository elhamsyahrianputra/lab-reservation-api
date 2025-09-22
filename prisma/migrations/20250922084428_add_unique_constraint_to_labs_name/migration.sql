/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `labs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."equipment_units" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."equipments" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."lab_inventories" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "labs_name_key" ON "public"."labs"("name");
