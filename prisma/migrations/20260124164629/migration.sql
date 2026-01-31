-- CreateTable
CREATE TABLE "PageImage" (
    "identifier" TEXT NOT NULL,
    "aboutImage" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PageImage_pkey" PRIMARY KEY ("identifier")
);
