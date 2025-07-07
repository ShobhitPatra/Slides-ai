/*
  Warnings:

  - You are about to drop the column `promt` on the `Interaction` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "promt",
ADD COLUMN     "prompt" TEXT NOT NULL;
