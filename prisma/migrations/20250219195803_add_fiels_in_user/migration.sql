/*
  Warnings:

  - You are about to drop the column `idRol` on the `User` table. All the data in the column will be lost.
  - Added the required column `completeName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rolId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_idRol_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idRol",
ADD COLUMN     "completeName" TEXT NOT NULL,
ADD COLUMN     "rolId" TEXT NOT NULL,
ADD COLUMN     "secondLastName" TEXT,
ADD COLUMN     "secondName" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("rolId") ON DELETE RESTRICT ON UPDATE CASCADE;
