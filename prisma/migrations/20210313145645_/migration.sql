-- CreateEnum
CREATE TYPE "CUBE_TYPE" AS ENUM ('BLACK', 'RED', 'ADDITIONAL');

-- CreateTable
CREATE TABLE "cube_probability" (
    "cube_probability_id" SERIAL NOT NULL,
    "cube_id" INTEGER NOT NULL,

    PRIMARY KEY ("cube_probability_id")
);

-- CreateTable
CREATE TABLE "cube" (
    "cube_id" SERIAL NOT NULL,
    "cube_type" "CUBE_TYPE" NOT NULL,

    PRIMARY KEY ("cube_id")
);

-- AddForeignKey
ALTER TABLE "cube_probability" ADD FOREIGN KEY ("cube_id") REFERENCES "cube"("cube_id") ON DELETE CASCADE ON UPDATE CASCADE;
