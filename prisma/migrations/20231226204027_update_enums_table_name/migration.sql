/*
  Warnings:

  - The `renewal` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "user_role_type" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "service_renewal_type" AS ENUM ('MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "services" DROP COLUMN "renewal",
ADD COLUMN     "renewal" "service_renewal_type" NOT NULL DEFAULT 'MONTHLY';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "user_role_type" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "ServiceRenewal";

-- DropEnum
DROP TYPE "UserRole";
