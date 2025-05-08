require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const CustomErr = require("../../utils/customErr");
const { refreshTokenMethods } = require("../../db/authQueries");


//refreshToken
//refreshToken is used to create a new accessToken if current accessToken expires
const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    const err = new CustomErr(`Unauthorize`, 401)
    next(err);
    return
  }

  const refreshToken = cookies.jwt;

  //get the current account from db using refresh token
  const currentAccountByToken = await refreshTokenMethods.currentAccountByToken(refreshToken);

  //checks if current account by refresh token exist in db
  //if not return an Unauthorized 401 response
  if (!currentAccountByToken) {
    const err = new CustomErr(`Unauthorized. User not found`, 401)
    next(err);
    return;
  }

  //if current account by refresh token exist
  //verify it in jwt
  //then if err or current account account id not equal to decoded id 
  //return an response of 403 Forbidden
  //if no err and accountId and decoded.id are equal 
  //then create a new access token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || currentAccountByToken.accountId !== decoded.id) {
        const err = new CustomErr(`Forbidden`, 403);
        next(err);
        return
      }

      //new access token
      const accessToken = jwt.sign(
        {
          "id": decoded.id,
          "username": decoded.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"}
      );

      res.status(200).json({
        accessToken: accessToken
      })
    }
  )
});

module.exports = handleRefreshToken;