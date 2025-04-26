const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { account, user } = require("../../db/prisma");
const CustomErr = require("../../utils/customErr");

const handleRegister = asyncHandler(async (req, res) => {

  const {username, password, email} = req.body;

  if (!username || !password || !email) throw new CustomErr("Invalid Inputs", 400)
  
  const hashPassword = await bcrypt.hash(password, 10);
  
  const resAccount = await account.createAccount(
    username,
    hashPassword,
    email,
  );

  console.log(resAccount)
  
  const getUser = await user.getUser(resAccount.accountId)
  
  res.status(200).json({
    message: "Account registered successfully",
    user: getUser
  })
});

module.exports = {
  handleRegister
};