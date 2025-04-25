const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const handleLogin = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  
  if (!username || !password || !email) return res.status(400).json({message: "invalid credentials"});

});

module.exports = handleLogin;
