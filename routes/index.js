const registerRoute = require("./auth/register");
const signinRoute = require("./auth/signin")
const postRoute = require("./api/post");

module.exports = {
  registerRoute,
  postRoute,
  signinRoute
}