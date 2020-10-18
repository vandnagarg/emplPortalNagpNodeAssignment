const express  = require('express');
const jobApplication = require('../models/jobApplication');
const user = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth')
//const socket = io.connect('http://localhost:3000')

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000',{reconnect:true}); 



router.post('/apply/:id',auth.isAuthenticatedForEmployee,(req,res,next)=>{
    //if user has not applied already
    const username = req.session.loggedInUser;
    user.findOne({empname:username},(err,user)=>{
        if(err){
            throw err;
        }
        if(user){
            var userId = user.id;
            var openingId = req.params.id;
            jobApplication.findOne({userId,openingId},(err,application)=>{
                if(err){
                    throw err;
                }
                if(application === null){
                    const jApp = new jobApplication({userId,openingId});
                    jApp.save((err,app)=>{
                        if(err){
                            console.log("error in applying");
                        }
                        socket.emit("jobapplied",{user:username,opening:openingId});
                        return res.redirect('/')
                    })
                }
                else{
                    console.log('You have already applied for the opening');
                    res.json( 'You have already applied for the opening');
                }
               
            })
        }
       
    })
})

module.exports = router;