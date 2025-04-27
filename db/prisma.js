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

const accountMethods = new Account();
const userMethods = new User();

module.exports = {
  accountMethods,
  userMethods
}