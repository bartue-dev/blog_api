/*
  Warnings:

  - Made the column `likedId` on table `LikedPost` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "LikedPost" DROP CONSTRAINT "LikedPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "LikedPost" DROP CONSTRAINT "LikedPost_postId_fkey";

-- DropIndex
DROP INDEX "LikedPost_likedAt_key";

-- AlterTable
ALTER TABLE "LikedPost" ALTER COLUMN "likedId" SET NOT NULL,
ADD CONSTRAINT "LikedPost_pkey" PRIMARY KEY ("likedId");

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("accountId") ON DELETE CASCADE ON UPDATE CASCADE;
