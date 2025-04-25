require("dotenv").config();

const devErr = (res, err) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    stackTrace: err.stack,
    error: err
  });
}

const prodErr = (res, err) => {
  if (err.isOperation === true) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      error: err
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Sorry, Something went wrong, Please try again later",
      error: err
    });
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //server err status code
  err.status = err.status || "err"; // client err status code

  if (process.env.NODE_ENV === "development"){
    devErr(res, err)
  } else if (process.env.NODE_ENV === "production") {
    prodErr(res, err)
  }
};

module.exports = errorHandler;


/* 
  ***two types of error***
  OPERATIONAL ERROR: An error that can be predict
  PROGRAMMING ERROR: An error that made by programmers


  Handles production and development errors
  this way is more secure and to pass a appropiate errors during development or production

*/
