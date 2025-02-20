-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "careerId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "codeAuth" TEXT NOT NULL,
    "resolutionNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "titleAwarded" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "instituteId" TEXT NOT NULL,
    "modalityId" TEXT NOT NULL,
    "typeCareerId" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("careerId")
);

-- CreateTable
CREATE TABLE "UserHasCareer" (
    "userId" TEXT NOT NULL,
    "careerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserHasCareer_pkey" PRIMARY KEY ("userId","careerId")
);

-- CreateTable
CREATE TABLE "Institute" (
    "id" SERIAL NOT NULL,
    "instituteId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "codeAuth" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Institute_pkey" PRIMARY KEY ("instituteId")
);

-- CreateTable
CREATE TABLE "Modality" (
    "id" SERIAL NOT NULL,
    "modalityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Modality_pkey" PRIMARY KEY ("modalityId")
);

-- CreateTable
CREATE TABLE "TypeCareer" (
    "id" SERIAL NOT NULL,
    "typeCareerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TypeCareer_pkey" PRIMARY KEY ("typeCareerId")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "typeDocId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "TypeDoc" (
    "id" SERIAL NOT NULL,
    "typeDocId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "header" TEXT,
    "content" TEXT,
    "footer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TypeDoc_pkey" PRIMARY KEY ("typeDocId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Career_code_key" ON "Career"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Career_codeAuth_key" ON "Career"("codeAuth");

-- CreateIndex
CREATE UNIQUE INDEX "Career_resolutionNumber_key" ON "Career"("resolutionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_code_key" ON "Institute"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_codeAuth_key" ON "Institute"("codeAuth");

-- CreateIndex
CREATE UNIQUE INDEX "Document_code_key" ON "Document"("code");

-- CreateIndex
CREATE INDEX "User_dni_email_idx" ON "User"("dni", "email");

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("instituteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "Modality"("modalityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_typeCareerId_fkey" FOREIGN KEY ("typeCareerId") REFERENCES "TypeCareer"("typeCareerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasCareer" ADD CONSTRAINT "UserHasCareer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasCareer" ADD CONSTRAINT "UserHasCareer_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("careerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_typeDocId_fkey" FOREIGN KEY ("typeDocId") REFERENCES "TypeDoc"("typeDocId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
