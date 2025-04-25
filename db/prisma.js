const { PrismaClient, Prisma } = require("@prisma/client");
const handlePrismaError = require("./prismaErrorHandling");

const prisma = new PrismaClient();

//account queries
class Account {
  async createAccount(username, password, email) {
    try {
      return await prisma.account.create({
        data: {
          username: username,
          password: password,
          email: email,
          user: {
            create: {} //creates a userId in the user model
          }
        },
        include: {
          user: true
        }
     });  
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
       throw handlePrismaError(error)
      }
      throw error
    }
  }
}

const account = new Account();


module.exports = {
  account,
  Prisma
}