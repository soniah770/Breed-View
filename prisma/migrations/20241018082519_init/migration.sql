-- CreateTable
CREATE TABLE "Breed" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "temperament" TEXT NOT NULL,
    "origin" TEXT,
    "life_span" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);
