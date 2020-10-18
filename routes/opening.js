var express = require('express');
const opening = require('./../models/opening');
var router = express.Router();
const Opening = require('./../models/opening');
const events = require('events');
const eventsEmitter = new events.EventEmitter();
const auth = require('../middleware/auth');
let token ;

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000',{reconnect:true}); 

router.get('/',auth.isAuthenticatedForEmployee,(req,res,next)=>{
    opening.find({status:'open'},(err,data)=>{
        res.render('./openings',{opening:data})
    })
})
router.get('/addNew',auth.isAuthenticatedForManager,(req,res,next)=>{
    res.render('./openings/addNew');
});
// router.use('/',(req,res,next)=>{
//     const opening = new Opening(req.body);
//     if(opening.)
//     res.render('/',{message:''})
// })
router.post('/addNew',auth.isAuthenticatedForManager,(req,res,next)=>{
    const opening = new Opening(req.body);
    opening.createdBy = req.session.loggedInUser;
    opening.save((err,openingSaved)=>{
        if(err!=null && err.errors){
            res.render('./openings/addNew',{mssg:'Please fill all the values to add an opening'})
            //console.log("Error in creating new opening");
        }
        else
        res.json(opening);
    })
});


router.get('/getDetail/:id',auth.isAuthenticatedForEmployee,(req,res,next)=>{ //auth.isAuthenticated,
    opening.findOne({_id:req.params.id},(err,data)=>{
        if(err){
            console.log(err)
        }
        req.session.prevurl = req.originalUrl;
        res.render('./openings/detail',{opening:data});
    })
});

router.get('/update',auth.isAuthenticatedForManager,(req,res,next)=>{
    opening.find({status:'open',createdBy:req.session.loggedInUser},(err,data)=>{
        res.render('./openings/update',{opening:data})
    })
});
router.post('/markclosed',(req,res,next)=>{
    opening.findOneAndUpdate({_id:req.body.projName},{status:'closed'},(err,data)=>{
        if(err){
            console.log(err)
        }
        socket.emit("openingClosed",{projName:req.body.projName,user:req.session.loggedInUser});
        res.render(req.url,{opening:data,updated:true});
    })
});
module.exports = router;