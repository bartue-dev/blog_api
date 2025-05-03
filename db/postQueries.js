const { PrismaClient } = require("@prisma/client");
const { commentMethods } = require("./commentQueries")

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
  async getAllPost(authorId, levels = 3) {
    return await prisma.post.findMany({
      where: {
        authorId: authorId
      },
      include: {
        comment: {
          include: includeComment(levels)
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

    //get all comments by postId and authorId
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        authorId: authorId
      }
    });

    //call the recursion deleteComment from commentMethods
    //to delete the child comment then parent comment first before deleting the post
    for (const comment of comments) {
      await commentMethods.deleteComment(comment.commentId, authorId)
    }

    //delete post
    return await prisma.post.delete({
      where: {
        postId: postId,
        authorId: authorId
      }
    });
  }  
}

//helper, to hanldle how many child comment include in getAllPost query
function includeComment(levels) {
  let query = { childComment: true };

  for (let i = 1; i < levels; i++) {
    query = { childComment: {include: query} }
  }

  return query
}


const postMethods = new Post();


module.exports = {
  postMethods
}