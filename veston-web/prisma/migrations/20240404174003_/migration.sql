/*
  Warnings:

  - The `del_yn` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `cre_usr_id` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(10)`.
  - You are about to alter the column `upd_usr_id` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(10)`.
  - A unique constraint covering the columns `[Employee_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('Y', 'N');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('RECEPTIONIST', 'SEWINGSTAFF', 'STOREMANAGER', 'SHIPPER', 'SECURITYGUARD', 'BRANCHMANAGER', 'GENERALMANAGER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "Employee_id" TEXT,
DROP COLUMN "del_yn",
ADD COLUMN     "del_yn" "YesNo" NOT NULL DEFAULT 'N',
ALTER COLUMN "cre_usr_id" SET DATA TYPE CHAR(10),
ALTER COLUMN "upd_usr_id" SET DATA TYPE CHAR(10);

-- DropEnum
DROP TYPE "Delete";

-- CreateTable
CREATE TABLE "Branch" (
    "area_id" CHAR(10) NOT NULL,
    "area_nm" TEXT NOT NULL,
    "branch_id" CHAR(10) NOT NULL,
    "branch_nm" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "del_yn" "YesNo" NOT NULL DEFAULT 'N',
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,
    "headoffice_yn" "YesNo" NOT NULL DEFAULT 'N',

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("area_id","branch_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "branchArea_id" CHAR(10) NOT NULL,
    "branchBranch_id" CHAR(10) NOT NULL,
    "employee_id" TEXT NOT NULL,
    "employee_nm" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "salary" INTEGER NOT NULL,
    "birthday" TIMESTAMP(6) NOT NULL,
    "del_yn" "YesNo" NOT NULL DEFAULT 'N',
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,
    "accountId" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_email_key" ON "Branch"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_phone_key" ON "Branch"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_adress_key" ON "Branch"("adress");

-- CreateIndex
CREATE UNIQUE INDEX "Account_Employee_id_key" ON "Account"("Employee_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_Employee_id_fkey" FOREIGN KEY ("Employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_branchArea_id_branchBranch_id_fkey" FOREIGN KEY ("branchArea_id", "branchBranch_id") REFERENCES "Branch"("area_id", "branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
