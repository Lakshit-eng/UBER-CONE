const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require('../controllers/user.controller');
// we need a package to validate the data entered by user express validator is the package we are going to use

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be 6 character long'),
],
userController.registerUser
)

//Login route

router.post("/login",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage('Password must be 6 character long'),
],
userController.loginUser
)



module.exports =router;