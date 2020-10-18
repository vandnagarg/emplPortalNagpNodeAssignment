const mongoose = require('mongoose');
const schema = mongoose.Schema;

const jobApplication = new schema({
    openingId:String,
    userId:String
});

module.exports = mongoose.model('JobApplication',jobApplication)