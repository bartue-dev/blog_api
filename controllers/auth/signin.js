require("dotenv").config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomErr = require("../../utils/customErr");
const { accountMethods, refreshTokenMethods } = require("../../db/prisma");


const handleSignin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  if (!req.body) {
    const err = new CustomErr(`Invalid credentials: ${req.body}`);
    next(err);
    return
  }

  const currentAccountByUsername = await accountMethods.currentAccountByUsername(username);

  console.log("Current account by name:", currentAccountByUsername);

  const passwordMatch = await bcrypt.compare(password, currentAccountByUsername.password);

  if (!passwordMatch) {
    res.status(401).json({
      success: false,
      message: "Unauthorized, Password not match"
    });
  } else {
    //creat JWTs

    //access token
    const accessToken = jwt.sign(
      {"id": currentAccountByUsername.tokenId},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "30m"}
    );

    //refresh token
    const refreshToken = jwt.sign(
      {"id": currentAccountByUsername.tokenId},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: "1d"}
    );

    //save refreshToken to database
    await refreshTokenMethods.saveToken(currentAccountByUsername.accountId,refreshToken);

    //save refreshToken to cookie httpOnly
    res.cookie(
      "jwt",
      refreshToken,
      {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 //1 day and 24hrs
      }
    ) ;
    
    res.json({
      //access token is already available in cookies no need to input it to response. This is for practice purposes only
      accessToken: accessToken, 
      sucess: true,
      message: "Log in sucessful"
    })
  }
});

module.exports = {
  handleSignin
};
