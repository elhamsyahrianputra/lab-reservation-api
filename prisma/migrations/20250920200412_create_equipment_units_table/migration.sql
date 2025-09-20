-- CreateEnum
CREATE TYPE "public"."EquipmentUnitCondition" AS ENUM ('NEW', 'GOOD', 'FAIR', 'NEED_REPAIR', 'DECOMMISSIONED');

-- CreateEnum
CREATE TYPE "public"."EquipmentUnitStatus" AS ENUM ('AVAILABLE', 'ON_LOAN', 'BOOKED', 'UNDER_MAINTENANCE', 'MISSING');

-- CreateTable
CREATE TABLE "public"."equipment_units" (
    "id" UUID NOT NULL,
    "equipment_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "condition" "public"."EquipmentUnitCondition" NOT NULL,
    "status" "public"."EquipmentUnitStatus" NOT NULL,
    "description" VARCHAR(255),
    "purchased_at" BIGINT,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "equipment_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipment_units_code_key" ON "public"."equipment_units"("code");

-- AddForeignKey
ALTER TABLE "public"."equipment_units" ADD CONSTRAINT "equipment_units_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
