/*
  Warnings:

  - The primary key for the `Interaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Interaction_id_seq";
