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

  if (!currentAccountByUsername) {
    const err = new CustomErr(`User not found ${username}`, 404)
    next(err);
    return;
  }

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
      {
        "id": currentAccountByUsername.accountId,
        "username": currentAccountByUsername.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "30m"}
    );

    //refresh token
    const refreshToken = jwt.sign(
      {
        "id": currentAccountByUsername.accountId,
        "username": currentAccountByUsername.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: "1d"}
    );

    //save refreshToken to database
    const saveTokenToDB = await refreshTokenMethods.saveToken(currentAccountByUsername.accountId,refreshToken);

    if (!saveTokenToDB) {
      const err = new CustomErr(`Error on saving token on db`, 400)
      next(err);
      return
    }

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
      accessToken: accessToken, 
      success: true,
      message: "Log in sucessful"
    })
  }
});

module.exports = handleSignin;
