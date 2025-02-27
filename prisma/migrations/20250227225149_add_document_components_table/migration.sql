-- CreateTable
CREATE TABLE "DocumentComponent" (
    "id" SERIAL NOT NULL,
    "documentComponentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "DocumentComponent_pkey" PRIMARY KEY ("documentComponentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentComponent_name_key" ON "DocumentComponent"("name");

-- AddForeignKey
ALTER TABLE "DocumentComponent" ADD CONSTRAINT "DocumentComponent_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("templateId") ON DELETE RESTRICT ON UPDATE CASCADE;
