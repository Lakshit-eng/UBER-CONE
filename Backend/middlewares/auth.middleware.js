const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//to check the user is authenticated we have to create and export middleware

module.exports.authUser = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const isBlacklisted = await userModel.findOne({token:token})
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    //if we found token then we will decrypt the token
    try{
       const decoded = jwt.verify(token,process.env.JWT_SECRET);
       const user = await userModel.findById(decoded._id);
       req.user = user;
       return next();

    }catch(error){
        return res.status(401).json({message:"Unauthorized"});
    }
}