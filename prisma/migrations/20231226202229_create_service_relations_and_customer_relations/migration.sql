/*
  Warnings:

  - Added the required column `user_id` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceRenewal" AS ENUM ('MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "customer_id" TEXT,
ADD COLUMN     "renewal" "ServiceRenewal" NOT NULL DEFAULT 'MONTHLY';

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
