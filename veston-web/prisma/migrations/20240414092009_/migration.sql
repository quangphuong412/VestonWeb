-- CreateEnum
CREATE TYPE "FashionCategory" AS ENUM ('VEST', 'SHIRT', 'TROUSERS', 'FABRIC_SAMPLE', 'ACCESSORIES');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REQUEST', 'REJECT', 'APPROVE', 'INPROCESS', 'DONE');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT;

-- CreateTable
CREATE TABLE "Costcode" (
    "cost_cd" CHAR(6) NOT NULL,
    "cost_nm" TEXT NOT NULL,
    "cost_color" TEXT NOT NULL,
    "cost_type" TEXT NOT NULL,
    "cost_uom" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Costcode_pkey" PRIMARY KEY ("cost_cd")
);

-- CreateTable
CREATE TABLE "WarehouseMaster" (
    "warehouse_id" CHAR(10) NOT NULL,
    "area_id" CHAR(3) NOT NULL,
    "branch_id" CHAR(5) NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "WarehouseMaster_pkey" PRIMARY KEY ("warehouse_id")
);

-- CreateTable
CREATE TABLE "WarehouseDetail" (
    "warehouse_id" CHAR(10) NOT NULL,
    "cost_cd" CHAR(6) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "WarehouseDetail_pkey" PRIMARY KEY ("warehouse_id","cost_cd")
);

-- CreateTable
CREATE TABLE "GoodsInvoiceMaster" (
    "inv_id" CHAR(10) NOT NULL,
    "area_id" CHAR(3) NOT NULL,
    "branch_id" CHAR(5) NOT NULL,
    "status" "Status" NOT NULL,
    "total_amt" INTEGER NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "GoodsInvoiceMaster_pkey" PRIMARY KEY ("inv_id")
);

-- CreateTable
CREATE TABLE "GoodsInvoiceDetail" (
    "inv_id" CHAR(10) NOT NULL,
    "total_amt" INTEGER NOT NULL,
    "cost_cd" CHAR(6) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit_amount" INTEGER NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "GoodsInvoiceDetail_pkey" PRIMARY KEY ("inv_id","cost_cd")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" CHAR(10) NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "FashionCategory" NOT NULL,
    "price" DOUBLE PRECISION,
    "product_img" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ProductDetail" (
    "product_detail_id" CHAR(10) NOT NULL,
    "product_id" CHAR(10) NOT NULL,
    "cost_cd" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("product_detail_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WarehouseMaster_area_id_branch_id_key" ON "WarehouseMaster"("area_id", "branch_id");

-- AddForeignKey
ALTER TABLE "WarehouseMaster" ADD CONSTRAINT "WarehouseMaster_area_id_branch_id_fkey" FOREIGN KEY ("area_id", "branch_id") REFERENCES "Branch"("area_id", "branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseDetail" ADD CONSTRAINT "WarehouseDetail_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "WarehouseMaster"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseDetail" ADD CONSTRAINT "WarehouseDetail_cost_cd_fkey" FOREIGN KEY ("cost_cd") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInvoiceMaster" ADD CONSTRAINT "GoodsInvoiceMaster_area_id_branch_id_fkey" FOREIGN KEY ("area_id", "branch_id") REFERENCES "Branch"("area_id", "branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInvoiceDetail" ADD CONSTRAINT "GoodsInvoiceDetail_inv_id_fkey" FOREIGN KEY ("inv_id") REFERENCES "GoodsInvoiceMaster"("inv_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInvoiceDetail" ADD CONSTRAINT "GoodsInvoiceDetail_cost_cd_fkey" FOREIGN KEY ("cost_cd") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_cost_cd_fkey" FOREIGN KEY ("cost_cd") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;
