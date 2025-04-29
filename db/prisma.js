const { PrismaClient } = require("@prisma/client");
const e = require("express");

const prisma = new PrismaClient();

//account queries
class Account {
  async createAccount(username, password, email) {
      return await prisma.account.create({
        data: {
          username: username,
          password: password,
          email: email,
          user: {
            create: {
              //creates a accountId in the user model automatically
              username: username
            } 
          }
        },
        include: {
          user: true
        }
     });  
  }

  async currentAccountByUsername(username) {
    return await prisma.account.findUnique({
      where: {
        username: username
      }
    });
  }
}

//user queries
class User {
  async getUser(userId) {
    return await prisma.user.findUnique({
      where: {
        accountId: userId
      }
    });
  }
}

//post queries
class Post {

  //create post
  async createPost(title, content, authorId) {
    return await prisma.post.create({
      data: {
        title,
        content,
        authorId
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
        comment: true
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
        title,
        content
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

//refresh token query
class refreshToken {
  //note: refresh token should be deleted/update if it exprires
  async saveToken(accountId, refreshToken) {
    return await prisma.refreshToken.upsert({
      where: {
        accountId: accountId
      },
      update: {
        refreshToken: refreshToken
      },
      create: {
        refreshToken: refreshToken,
        accountId: accountId
      }
    });
  }

  //current user by refresh token
  async currentAccountByToken(refreshToken) {
    return await prisma.refreshToken.findFirst({
      where: {
        refreshToken: refreshToken
      }
    });
  }

  //delete refresh token
  async deleteRefreshToken(refreshToken) {
    return await prisma.refreshToken.delete({
      where: {
        refreshToken: refreshToken
      }
    });
  }
}

const accountMethods = new Account();
const userMethods = new User();
const postMethods = new Post();
const refreshTokenMethods = new refreshToken();

module.exports = {
  accountMethods,
  userMethods,
  postMethods,
  refreshTokenMethods
}