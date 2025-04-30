const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { accountMethods, userMethods } = require("../../db/prisma");
const CustomErr = require("../../utils/customErr");

const handleRegister = asyncHandler(async (req, res) => {

  const {username, password, email} = req.body;

  if (!username || !password || !email) throw new CustomErr("Invalid Inputs", 400)
  
  const hashPassword = await bcrypt.hash(password, 10);
  
  const createdAccount = await accountMethods.createAccount(
    username,
    hashPassword,
    email,
  );

  if (!createdAccount) {
    const err = new CustomErr(`Cannot create an account`, 400);
    next(err);
    return;
  }

  const getUser = await userMethods.getUser(createdAccount.accountId)

  //opt 2
  //destructure the getUser object and exclude the userId from the object
  //then pass the user obj to the response
  // const { userId, ...user} = getUser  

  res.status(200).json({
    message: "Account registered successfully",
    user: getUser //return the new object user
  })
});

module.exports = handleRegister;