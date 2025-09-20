-- CreateTable
CREATE TABLE "public"."loan_items" (
    "id" UUID NOT NULL,
    "loan_id" UUID NOT NULL,
    "equipment_unit_id" UUID NOT NULL,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "loan_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."loan_items" ADD CONSTRAINT "loan_items_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
