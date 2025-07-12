-- CreateTable
CREATE TABLE "Slide" (
    "id" TEXT NOT NULL,
    "slideNo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "bulletPoints" JSONB NOT NULL,
    "canvas" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interactionId" TEXT NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
