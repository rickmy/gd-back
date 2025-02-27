/*
  Warnings:

  - You are about to drop the column `content` on the `TypeDoc` table. All the data in the column will be lost.
  - You are about to drop the column `footer` on the `TypeDoc` table. All the data in the column will be lost.
  - You are about to drop the column `header` on the `TypeDoc` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TypeDoc" DROP COLUMN "content",
DROP COLUMN "footer",
DROP COLUMN "header";
