/*
  Warnings:

  - The values [UNDER_MAINTENACE] on the enum `LabStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `Behck_out_at` on the `reservations` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."LabStatus_new" AS ENUM ('AVAILABLE', 'UNDER_MAINTENANCE');
ALTER TABLE "public"."labs" ALTER COLUMN "status" TYPE "public"."LabStatus_new" USING ("status"::text::"public"."LabStatus_new");
ALTER TYPE "public"."LabStatus" RENAME TO "LabStatus_old";
ALTER TYPE "public"."LabStatus_new" RENAME TO "LabStatus";
DROP TYPE "public"."LabStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."reservations" DROP COLUMN "Behck_out_at",
ADD COLUMN     "check_out_at" BIGINT;

-- CreateTable
CREATE TABLE "public"."equipment_categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "equipment_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipment_categories_name_key" ON "public"."equipment_categories"("name");

-- AddForeignKey
ALTER TABLE "public"."reservations" ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reservations" ADD CONSTRAINT "reservations_lab_id_fkey" FOREIGN KEY ("lab_id") REFERENCES "public"."labs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
