const jwt = require('express-jwt');
const expressJwt = require('jsonwebtoken')

function isAuthenticated(req, res, next){
    console.log(req.session.JWTKey)
    var token = req.session.JWTKey;
    try{
        const decoded = expressJwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.role);
        next();
    }
    catch(ex){
        res.redirect('/auth/login');
    }
}
function isAuthenticatedForManager(req, res, next){
    var token = req.session.JWTKey;
    try{
        const decoded = expressJwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.role);
        if(decoded.role === "manager"){
            next();
        }
        else
        res.render('shared/unauthenticated')
    }
    catch(ex){
        res.redirect('/auth/login')
    }
}
function isAuthenticatedForEmployee(req, res, next){
    var token = req.session.JWTKey;
    try{
        const decoded = expressJwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role === "employee"){
            next();
        }
        else
        res.render('shared/unauthenticated')
    }
    catch(ex){
        res.redirect('/auth/login')
    }
}
module.exports = {isAuthenticated,isAuthenticatedForEmployee,isAuthenticatedForManager};