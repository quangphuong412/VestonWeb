/*
  Warnings:

  - The primary key for the `Branch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `area_id` on the `Branch` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Char(3)`.
  - You are about to alter the column `branch_id` on the `Branch` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Char(5)`.
  - You are about to alter the column `branchArea_id` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Char(3)`.
  - You are about to alter the column `branchBranch_id` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Char(5)`.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_branchArea_id_branchBranch_id_fkey";

-- AlterTable
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_pkey",
ALTER COLUMN "area_id" SET DATA TYPE CHAR(3),
ALTER COLUMN "branch_id" SET DATA TYPE CHAR(5),
ADD CONSTRAINT "Branch_pkey" PRIMARY KEY ("area_id", "branch_id");

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "branchArea_id" SET DATA TYPE CHAR(3),
ALTER COLUMN "branchBranch_id" SET DATA TYPE CHAR(5);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_branchArea_id_branchBranch_id_fkey" FOREIGN KEY ("branchArea_id", "branchBranch_id") REFERENCES "Branch"("area_id", "branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
