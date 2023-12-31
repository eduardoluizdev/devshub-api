/*
  Warnings:

  - Made the column `customer_id` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_customer_id_fkey";

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "customer_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
