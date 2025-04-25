const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }

  next();
};


module.exports = credentials;

/* 

- for the Client || browser it need to set the -
- Access-Control-Allow-Credentials: true
- to ensure that the header is set to trusted origin

*/