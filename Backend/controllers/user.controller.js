const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const{validationResult} = require("express-validator");
//now we are going to perform authentication for user

module.exports.registerUser = async(req,res,next)=>{

 const errors = validationResult(req);
 if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
 }

 const {fullname,email,password} =req.body;
 
   const hashPassword = await userModel.hashPassword(password);    //this hashPassword is called from userMoedel to hash the password

   const user = await userService.createUser({      // this create user is called from user service inside services folder
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashPassword
   })
   
   //---------Now the user which is going to create here we need to generate a token from him

   // now in userModel we have already crated a method for it

   const token = user.generateAuthToken();
   
   res.status(201).json({token,user});
}