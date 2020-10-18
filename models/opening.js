const mongoose = require('mongoose');
const bcrypt = require('bcrypt') 
const saltRounds  = process.env.SALT_ROUNDS || 10;

const schema = mongoose.Schema;

const openingSchema = new schema({
    projName:{type:String,required:true},
    clientName:{type:String,required:true},
    technologies:{type:String,required:true},
    role:{type:String,required:true},
    jobDesc:{type:String,required:true},
    status:{type:String,required:true},
    createdBy:{type:String,required:true},
});

module.exports = mongoose.model("Openings",openingSchema);
