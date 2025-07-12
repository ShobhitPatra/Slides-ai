/*
  Warnings:

  - You are about to drop the column `response` on the `Interaction` table. All the data in the column will be lost.
  - The primary key for the `Slide` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `canvas` on the `Slide` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Slide` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Slide` table. All the data in the column will be lost.
  - Changed the type of `slideNo` on the `Slide` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "response";

-- AlterTable
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_pkey",
DROP COLUMN "canvas",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD COLUMN     "canvasJson" JSONB,
DROP COLUMN "slideNo",
ADD COLUMN     "slideNo" INTEGER NOT NULL,
ADD CONSTRAINT "Slide_pkey" PRIMARY KEY ("slideNo");
