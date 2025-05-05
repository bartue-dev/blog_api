/*
  Warnings:

  - The primary key for the `LikedPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LikedPost` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[likedAt]` on the table `LikedPost` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LikedPost" DROP CONSTRAINT "LikedPost_pkey",
DROP COLUMN "id",
ADD COLUMN     "likedId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "LikedPost_likedAt_key" ON "LikedPost"("likedAt");
