-- CreateTable
CREATE TABLE "PageText" (
    "identifier" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PageText_pkey" PRIMARY KEY ("identifier")
);
