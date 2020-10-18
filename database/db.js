const mongoose =  require('mongoose');

function connectToDatabase(dbUrl){
    console.log(dbUrl)
    mongoose.connect(dbUrl,{useNewUrlParser:true});
    const connection= mongoose.connection;
    connection.on('error',(err)=>{
        console.log('error in connecting in database');
    });
    console.log("connected");
}

module.exports = {connectToDatabase}