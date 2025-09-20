-- CreateEnum
CREATE TYPE "public"."LoanStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."loans" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "notes" TEXT,
    "status" "public"."LoanStatus" NOT NULL,
    "pickup_due_at" BIGINT NOT NULL,
    "return_due_at" BIGINT NOT NULL,
    "pickup_at" BIGINT,
    "returned_at" BIGINT,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
