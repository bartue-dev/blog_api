const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { accountMethods, userMethods } = require("../../db/prisma");
const CustomErr = require("../../utils/customErr");

const handleRegister = asyncHandler(async (req, res) => {

  const {username, password, email} = req.body;

  if (!username || !password || !email) throw new CustomErr("Invalid Inputs", 400)
  
  const hashPassword = await bcrypt.hash(password, 10);
  
  const resAccount = await accountMethods.createAccount(
    username,
    hashPassword,
    email,
  );

  console.log(resAccount)
  
  const getUser = await userMethods.getUser(resAccount.accountId)

  //destructure the getUser object and exclude the userId from the object
  const { userId, ...user} = getUser  

  res.status(200).json({
    message: "Account registered successfully",
    user: user //return the new object user
  })
});

module.exports = {
  handleRegister,
};