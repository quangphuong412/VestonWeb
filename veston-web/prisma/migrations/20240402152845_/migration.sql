/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "account";

-- CreateTable
CREATE TABLE "Account" (
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

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_usr_email_key" ON "Account"("usr_email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_usrname_key" ON "Account"("usrname");
