const mongoose = require('mongoose');
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const saltRounds  = process.env.SALT_ROUNDS || 10;
const jwtToken = process.env.JWT_SECRET;

const schema = mongoose.Schema;

const userSchema = new schema({
    empname:{type:String,required:true},
    password:{type:String,required:true},
    userRole:String
});
userSchema.methods.setHashPassword =async function(){
    const hashedPassword = await bcrypt.hash(this.password,saltRounds);
    this.password = hashedPassword
}
userSchema.methods.validatePassword =async function(password){
    const pwdMatches = await bcrypt.compare(password,this.password)
    return pwdMatches;
    // return password == this.password;
}
userSchema.methods.generateJWTToken = function(){
    const today = new Date();
    const expDate = new Date(today);
    expDate.setDate(today.getDate() + 1);

    return jwt.sign({
        _id:this._id,
        username:this.username,
        role:this.userRole,
        exp:parseInt(expDate.getTime()/1000,10)
    },
    jwtToken
    )
}
userSchema.methods.toAuthJson = function(){
    return {
        username : this.empname,
        _id:this.id,
        token:this.generateJWTToken()
    }
}
module.exports = mongoose.model("User",userSchema);