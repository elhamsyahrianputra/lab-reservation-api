/*
  Warnings:

  - You are about to drop the column `booking_end_at` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `booking_start_at` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `booking_at` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."reservations" DROP COLUMN "booking_end_at",
DROP COLUMN "booking_start_at",
ADD COLUMN     "booking_at" BIGINT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL;
