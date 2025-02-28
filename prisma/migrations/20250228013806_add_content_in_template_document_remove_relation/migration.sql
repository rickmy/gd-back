/*
  Warnings:

  - You are about to drop the column `templateId` on the `DocumentComponent` table. All the data in the column will be lost.
  - Added the required column `content` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `DocumentComponent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DocumentComponent" DROP CONSTRAINT "DocumentComponent_templateId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "content" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "DocumentComponent" DROP COLUMN "templateId",
ADD COLUMN     "content" JSONB NOT NULL;
