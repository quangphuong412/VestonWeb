/*
  Warnings:

  - The `cre_dt` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "cre_dt",
ADD COLUMN     "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
