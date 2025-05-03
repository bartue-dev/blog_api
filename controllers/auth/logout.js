require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const CustomErr = require("../../utils/customErr");
const { refreshTokenMethods } = require("../../db/authQueries");

//handle logout 
const handleLogout = asyncHandler(async (req, res, next) => {
 // note: on client, also delete the accessToken

  //get cookies where the refreshToken lives
  //cookies only accessible when cookie-parser is invoke
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    const err = CustomErr(`No Content`, 204)
    next(err);
    return
  }

  const refreshToken = cookies.jwt;
  const currentAccountByToken = await refreshTokenMethods.currentAccountByToken(refreshToken);

  //is refresh token in db?
  if (!currentAccountByToken) {
  //delete refreshToken in cookies
    res.clearCookie(
      "jwt",
      {
        httpOnly: true,
        sameSite: "None",
        secure: true
      }
    )
    return res.sendStatus(204);
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