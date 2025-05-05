const { prisma } = require("./helper")

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
      },
      //used omit clause to exclude the userId from the result
      //also select clause is opposite to omit
      omit: {
        userId: true
      }
    });
  }
}

//refresh token queries
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
  async deleteRefreshToken(accountId) {
    return await prisma.refreshToken.delete({
      where: {
        accountId: accountId
      }
    });
  }
}

const accountMethods = new Account();
const userMethods = new User();
const refreshTokenMethods = new refreshToken();

module.exports = {
  accountMethods,
  refreshTokenMethods,
  userMethods
}