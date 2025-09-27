/*
  Warnings:

  - A unique constraint covering the columns `[lab_id,name]` on the table `lab_inventories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lab_inventories_lab_id_name_key" ON "public"."lab_inventories"("lab_id", "name");
