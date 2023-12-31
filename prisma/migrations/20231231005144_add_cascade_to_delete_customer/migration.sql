-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_customer_id_fkey";

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
