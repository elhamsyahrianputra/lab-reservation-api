-- AddForeignKey
ALTER TABLE "public"."loan_items" ADD CONSTRAINT "loan_items_equipment_unit_id_fkey" FOREIGN KEY ("equipment_unit_id") REFERENCES "public"."equipment_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
