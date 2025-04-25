const { PrismaClient } = require("@prisma/client")

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
          create: {}
        }
      },
      include: {
        user: true
      }
   });
  }

}

const account = new Account();


module.exports = {
  account
}