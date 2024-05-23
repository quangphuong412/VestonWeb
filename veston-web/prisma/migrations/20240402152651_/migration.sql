/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "usr_email" TEXT NOT NULL,
    "usr_name" TEXT NOT NULL,
    "usrname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "ofc_cd" TEXT NOT NULL,
    "del_yn" "Delete" NOT NULL,
    "cre_usr_id" TEXT NOT NULL,
    "cre_dt" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" TEXT NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_usr_email_key" ON "account"("usr_email");

-- CreateIndex
CREATE UNIQUE INDEX "account_usrname_key" ON "account"("usrname");
