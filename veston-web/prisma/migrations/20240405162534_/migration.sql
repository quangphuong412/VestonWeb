/*
  Warnings:

  - You are about to drop the column `adress` on the `Branch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Branch_adress_key";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_address_key" ON "Branch"("address");
