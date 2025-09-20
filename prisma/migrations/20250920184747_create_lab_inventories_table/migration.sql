-- CreateTable
CREATE TABLE "public"."lab_inventories" (
    "id" UUID NOT NULL,
    "lab_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "lab_inventories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."lab_inventories" ADD CONSTRAINT "lab_inventories_lab_id_fkey" FOREIGN KEY ("lab_id") REFERENCES "public"."labs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
