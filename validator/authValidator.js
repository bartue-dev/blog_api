const { body, param } = require("express-validator");

const isEmptyMsg = "must not be empty";
const isLengthMsg = "must be atleast 4 characters or more"
const passLength = "must be atleast 8 characters or more"
const passContains = "must contains number, symbols and letters"

const validateRegister = [
  body("username").trim()
    .notEmpty().withMessage(`Usernamme ${isEmptyMsg}`)
    .isLength({min: 4}).withMessage(`Username ${isLengthMsg}`),
  body("password").trim()
    .notEmpty().withMessage(`Password ${isEmptyMsg}`)
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/).withMessage(`Password ${passLength} and ${passContains}`),
  body("email").trim()
    .notEmpty().withMessage(`Email ${isEmptyMsg}`)
    .isEmail().withMessage("Invalid email"),
  body("confirm-password").custom((value, {req}) => {
    return value === req.password
  }).withMessage("Password not match")
]

const validateSignin = [
  body("username").trim()
    .notEmpty().withMessage(`Username ${isEmptyMsg}`),
  body("password").trim()
    .notEmpty().withMessage(`Password ${isEmptyMsg}`)
]

module.exports = {
  validateRegister,
  validateSignin
}