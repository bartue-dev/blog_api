
// custom error is a operational error which means it only handles the error that can be predicted
// extends the Error Method so the CustomErr inherits properties from Error Method
// extends the Error Method so the CustomErr would behave like a proper error
// note: Error is a built it class method in javascript
class CustomErr extends Error {
  constructor (message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";

    this.isOperation = true

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = CustomErr;