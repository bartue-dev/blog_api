//auth
const registerRoute = require("./auth/register");
const signinRoute = require("./auth/signin")
const refreshTokenRoute = require("./auth/refreshToken");
const logoutRoute = require("./auth/logout");

//api
const postRoute = require("./api/post");
const commentRoute = require("./api/comment");
const likedPostRoute = require("./api/likedPost")
const publicData = require("./api/publicData")

module.exports = {
  registerRoute,
  signinRoute,
  refreshTokenRoute,
  logoutRoute,
  postRoute,
  commentRoute,
  likedPostRoute,
  publicData
}