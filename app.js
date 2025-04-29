require("dotenv").config();
const express = require("express");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const CustomErr = require("./utils/customErr");
const verifyJwt = require("./middleware/verifitJwt");


//handles syncchronous error. Ex. undifined variable or function
//it should shut down the app because the server already crashed
//it should invoke before the app express() to make sure it work
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exeoption occured!, shutting down");
  
  process.exit(1) 
});

const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware allows urlencoded data
app.use(express.urlencoded({extended:true}))

// middleware json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

//auth routes
app.use("/register", router.registerRoute);
app.use("/sign-in", router.signinRoute);
app.use("/refreshToken", router.refreshTokenRoute);
app.use("/log-out", router.logoutRoute);

//api routes
//verifiy every api routes for each user
app.use(verifyJwt); 
app.use("/api/v1/post", router.postRoute);

//default route
//handles error if the the url cannot find
app.all(/(.*)/, (req, res, next) => {
  //set the CustomErr class
  const err = new CustomErr(`Can't find ${req.originalUrl} on the server`, 404)
  next(err);
});

//errorHandler middleware
app.use(errorHandler)

//server
const PORT = process.env.PORT || 3500
const server = app.listen(PORT, () => console.log(`Server listening to PORT ${PORT}`));

//handle rejection promise, if no catch block to a promise
//it should shut down the app because the server already crashed
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured!, shutting down");

  server.close(() => {
    process.exit(1) 
  });

  /* 
process.exit( code )
Code: It can be either 0 or 1. 
0 means end the process without any kind of failure and 
1 means end the process with some failure.
*/
})







