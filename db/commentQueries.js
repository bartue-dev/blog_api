const { PrismaClient } = require("@prisma/client");
const { includeComment } = require("./helper");

const prisma = new PrismaClient();

class Comment {
  //create comment
  async createComment(content, authorId, postId) {
    return await prisma.comment.create({
     data: {
      content: content,
      postId: postId,
      authorId: authorId
     }
    });
  }

  //create child comment
  async creatChildComment(content, authorId, commentId) {
    return await prisma.comment.create({
      data: {
        content: content,
        authorId: authorId,
        parentCommentId: commentId, 
      }
    })
  }

  //get all comments
  async getAllComments(postId, authorId, levels = 3) {
    return await prisma.comment.findMany({
      where: {
        postId: postId,
        authorId: authorId
      },
      include:{
        childComment: {
          include: includeComment(levels) 
        } 
      }
    });
  }

  //get child comments
  async getChildComments(commentId, authorId) {
    return await prisma.comment.findMany({
      where: {
        parentCommentId: commentId,
        authorId: authorId
      }
    });
  }

  //update comment
  async updateComment(content, authorId, commentId){
    return await prisma.comment.update({
      where: {
        commentId: commentId,
        authorId: authorId
      },
      data: {
        content: content
      }
    });
  }

  //delete comment recursively
  async deleteComment(commentId, authorId) {

    const childComment = await prisma.comment.findMany({
      where:{
        parentCommentId: commentId,
        authorId:authorId
      }
    });

    //recursive delation
    for (const child of childComment) {
      await this.deleteComment(child.commentId, authorId)
    }

    //during recursion delete all the children comment using parentCommentId
    await prisma.comment.deleteMany({
      where: {
        parentCommentId: commentId,
        authorId: authorId
      }
    });

    //then delete the parent comment
    return await prisma.comment.delete({
      where: {
        commentId: commentId,
        authorId: authorId
      }
    });
  }
}

const commentMethods = new Comment();

module.exports = {
  commentMethods
}