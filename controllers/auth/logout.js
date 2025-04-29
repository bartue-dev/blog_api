require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const CustomErr = require("../../utils/customErr");
const { refreshTokenMethods } = require("../../db/prisma");

//handle logout 
const handleLogout = asyncHandler(async (req, res, next) => {
 // note: on client, also the delete the accessToken

  //get cookies where the refreshToken lives
  //cookies only accessible when cookie-parser is invoke
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    const err = CustomErr(`No Content`, 204)
    next(err);
    return
  }

  const refreshToken = cookies.jwt;
  const currentUserByToken = await refreshTokenMethods.currentUserByToken(refreshToken);

  //is refresh token in db?
  if (!currentUserByToken) {
  //delete refreshToken in cookies
    res.clearCookie(
      "jwt",
      {
        httpOnly: true,
        sameSite: "None",
        secure: true
      }
    )

    const err = new CustomErr(`No Content`, 204)
    next(err);
    return
  }

  //delete refreshToken in db
  await refreshTokenMethods.deleteRefreshToken(refreshToken);


  //delete refreshToken in cookies
  res.clearCookie(
    "jwt",
    {
      httpOnly: true,
      sameSite: "None",
      secure: true
    }
  );

  res.sendStatus(204);
});

module.exports = handleLogout;