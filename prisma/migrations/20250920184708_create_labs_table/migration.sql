-- CreateEnum
CREATE TYPE "public"."LabStatus" AS ENUM ('AVAILABLE', 'UNDER_MAINTENACE');

-- CreateTable
CREATE TABLE "public"."labs" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "public"."LabStatus" NOT NULL,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "labs_pkey" PRIMARY KEY ("id")
);
