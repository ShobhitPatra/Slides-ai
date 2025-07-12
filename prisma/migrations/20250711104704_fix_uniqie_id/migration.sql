/*
  Warnings:

  - A unique constraint covering the columns `[interactionId,slideNo]` on the table `Slide` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Slide_interactionId_slideNo_key" ON "Slide"("interactionId", "slideNo");
