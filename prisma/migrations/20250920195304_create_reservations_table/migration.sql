-- CreateEnum
CREATE TYPE "public"."ReservationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."reservations" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "lab_id" UUID NOT NULL,
    "status" "public"."ReservationStatus" NOT NULL,
    "notes" TEXT,
    "booking_start_at" BIGINT NOT NULL,
    "booking_end_at" BIGINT NOT NULL,
    "check_in_at" BIGINT,
    "Behck_out_at" BIGINT,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);
