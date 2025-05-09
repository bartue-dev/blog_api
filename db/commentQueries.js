const { includeComment, prisma } = require("./helper");

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
  async getAllComments(postId, levels = 3) {
    return await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include:{
        childComment: {
          include: includeComment(levels) 
        } 
      }
    });
  }

  //get all comments with pagination
  async getAllCommentsWithPagination(postId, skip, take, levels = 3) {
    return await prisma.comment.findMany({
      skip: +skip,
      take: +take,
      where: {
        postId: postId,
      },
      include:{
        childComment: {
          include: includeComment(levels) 
        } 
      }
    });
  }

  //get child comments
  async getChildComments(commentId) {
    return await prisma.comment.findMany({
      where: {
        parentCommentId: commentId
      }
    });
  }

  //get child comments with pagination
  async getChildCommentsWithPagination(commentId, skip, take) {
    return await prisma.comment.findMany({
      skip: +skip,
      take: +take,
      where: {
        parentCommentId: commentId
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