-- CreateTable
CREATE TABLE "public"."equipments" (
    "id" UUID NOT NULL,
    "equipment_category_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."equipments" ADD CONSTRAINT "equipments_equipment_category_id_fkey" FOREIGN KEY ("equipment_category_id") REFERENCES "public"."equipment_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
