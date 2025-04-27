const { PrismaClient } = require("@prisma/client");

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
              name: username
            } 
          }
        },
        include: {
          user: true
        }
     });  
  }
}

class User {
  async getUser(userId) {
    return await prisma.user.findUnique({
      where: {
        accountId: userId
      }
    });
  }
}

class Post {
  async createPost(title, content, authorId) {
    return await prisma.post.create({
      data: {
        title,
        content,
        authorId
      }
    });
  }

  async getAllPost(authorId) {
    return await prisma.post.findMany({
      where: {
        authorId: authorId
      }
    });
  }
}

const accountMethods = new Account();
const userMethods = new User();
const postMethods = new Post();

module.exports = {
  accountMethods,
  userMethods,
  postMethods
}