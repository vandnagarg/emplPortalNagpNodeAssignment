const passport = require('passport')
const localStratergy = require('passport-local')
const User = require('../models/User')

passport.use(new localStratergy((username,password,next)=>{
    User.findOne({
        empname: username
    },
    async (err,user)=>{
        if(err){
            return next(err);
        }
        if(!user || !(await user.validatePassword(password))){
            return next(null,false)
        }
        return next(null,user)
    })
}))