const { prisma } = require("./helper");

class LikedPost {
  async saveLikedPost(postId, authorId) {
    return await prisma.likedPost.upsert({
      where: {
        postId: postId,
      },
      update: {
        postId: postId
      },
      create: {
        postId: postId,
        authorId: authorId
      },
      include: {
        post: true
      }
    });
  }

  async getlikedPost(postId) {
    return await prisma.likedPost.findUnique({
      where: {
        postId,
      }
    });
  }

  async undoLikedPost(likedId, authorId) {
    return await prisma.likedPost.delete({
      where: {
        likedId: likedId,
        authorId: authorId
      }
    });
  }

  async getAllLikedPost(authorId) {
    return await prisma.likedPost.findMany({
      where: {
        authorId: authorId
      },
      include: {
        post:true,
      }
    });
  }
}

const likedPostMethods = new LikedPost();

module.exports = {
  likedPostMethods
}