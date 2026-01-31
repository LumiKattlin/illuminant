-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "color1" TEXT NOT NULL DEFAULT '#000000',
    "color2" TEXT NOT NULL DEFAULT '#000000',
    "image" TEXT NOT NULL DEFAULT '',
    "visible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);
