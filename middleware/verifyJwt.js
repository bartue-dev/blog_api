require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomErr = require("../utils/customErr");


//verifyJwt
//verifyJwt middleware used to verify the current user accessToken before access the api route
//if authHeader falsy return customErr
//if not, takes the token from the header authorization
//then use it to verify in jwt.verify
const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    const err = new CustomErr(`Invalid authorization header`, 401);
    next(err);
    return
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("token verify error:", err.name);
        const customErr = new CustomErr(`Invalid token`, 403);
        next(customErr);
        return
      }

      req.user = decoded.id
      next();
    }
  )
};

module.exports = verifyJwt;