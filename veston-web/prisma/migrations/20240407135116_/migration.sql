/*
  Warnings:

  - You are about to drop the column `ofc_cd` on the `Account` table. All the data in the column will be lost.
  - Added the required column `branch_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "ofc_cd",
ADD COLUMN     "branch_id" CHAR(5) NOT NULL;
