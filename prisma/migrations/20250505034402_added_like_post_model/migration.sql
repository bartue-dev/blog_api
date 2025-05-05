-- CreateTable
CREATE TABLE "LikePost" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "LikePost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikePost" ADD CONSTRAINT "LikePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikePost" ADD CONSTRAINT "LikePost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;
