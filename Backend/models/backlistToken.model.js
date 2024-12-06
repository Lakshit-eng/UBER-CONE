const mongoose= require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({    // this schema is to store all the tokens that are blacklisted by user by logging out
    token:{
        type:String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400  //24 hours in seconds 
    }
});

module.exports = mongoose.model('BlacklistToken',blacklistTokenSchema);