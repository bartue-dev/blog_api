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
              name: username
            } //creates a userId in the user model
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

const account = new Account();
const user = new User();

module.exports = {
  account,
  user
}