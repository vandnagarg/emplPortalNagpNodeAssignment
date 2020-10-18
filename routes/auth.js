const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router  = express.Router();
router.use('/login',(req,res,next)=>{
    const user = {empname:req.body.username,password:req.body.password};

    if(user.empname !== undefined && user.password !== undefined){
        if(user.empname != '' && user.password != ''){
            next();
        }
        else{
            res.render('login',{mssg:'Please fill all the values'})
        }
    }
    else{
        next();
    }
})
router.get('/',(req,res,next)=>{
    res.render('register')
})
router.get('/signup',(req,res,next)=>{
    res.render('register')
})
router.get('/login',(req,res,next)=>{
    res.render('login')
})
router.post('/register', (req,res,next)=>{
    User.findOne({empname:req.body.empname},async (err,usr)=>{
        if(err){
            throw(err)
        }
        if(usr==null){
            const newuser = new User(req.body);
            await newuser.setHashPassword();
            newuser.save((err,savedUser)=>{
                if((err!=null && err.errors)){
                    res.render('register',{error:'Please fill all the values'})
                }
                else{
                    savedUser = savedUser.toAuthJson();
                    req.session.loggedInUser = savedUser.username;
                    req.session.JWTKey = savedUser.token;
                    res.redirect('/')
                }
                
            })
        }
        else
        {
            res.render('register',{ error: 'User already present'})
        }
    })
    
})
router.post('/login',passport.authenticate('local',{session: false}),(req,res,next)=>{
    const user = req.user.toAuthJson();
    req.session.loggedInUser = user.username;
    req.session.JWTKey = user.token;
    res.redirect('/')
})
router.get('/logout',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/')
})
module.exports = router;