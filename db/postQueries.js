const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//post queries
class Post {

  //create post
  async createPost(title, content, authorId) {
    return await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId
      }
    });
  }

  //get all post
  async getAllPost(authorId) {
    return await prisma.post.findMany({
      where: {
        authorId: authorId
      },
      include: {
        comment: {
          include: {
            childComment: true,
          }
        }
      }
    });
  }

  //get specific post
  async getPost(authorId, postId) {
    return await prisma.post.findFirst({
      where: {
        postId: postId,
        authorId: authorId
      },
      include: {
        comment: true
      }
    });
  }

  //update post
  async updatePost(postId, authorId, title, content) {
    return await prisma.post.update({
      where: {
        postId: postId,
        authorId: authorId
      },
      data: {
        title: title,
        content: content
      }
    });
  }

  //delete post
  async deletePost(postId, authorId) {
    return await prisma.post.delete({
      where: {
        postId: postId,
        authorId: authorId
      }
    });
  }
  
}

const postMethods = new Post();


module.exports = {
  postMethods
}