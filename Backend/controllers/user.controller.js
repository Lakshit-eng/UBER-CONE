const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const{validationResult} = require("express-validator");
//now we are going to perform authentication for user

//REGISTER controller
module.exports.registerUser = async(req,res,next)=>{

 const errors = validationResult(req);
 if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
 }

 const {fullname,email,password} =req.body;
  const userCheck =await userModel.findOne({email});
  try{
   if(userCheck){
      res.status(401).json({message:"email already exists"});
     }

  
 
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

   // for testing purpose
   console.log("user is registered");
   
   res.status(201).json({token,user});
   
      }catch(error){
      console.log(error);
     }
}

// LOGIN controller
module.exports.loginUser = async(req,res,next)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }

 const{email,password} = req.body;
   
 const user = await userModel.findOne({email}).select('+password'); // in user model the password is already select false so we have to make it true to fetch ot from there
 
 if(!user){
   return res.status(401).json({message:"Invalid email or Password"});
 }
 const isMatch = await user.comparePassword(password);   //  already made this compare password method in userModel
  if(!isMatch){
   return res.status(401).json({message:"Invalid email or Password"});
  }

  //if password is matched then we will generate a token

  const token  = user.generateAuthToken();  //this generateAuthToken method is already made by us
   
  //after generating token with status code 200 we will send token and user

  // for testing purpose
  console.log("user is logged in");
  res.status(200).json({token,user});

}
