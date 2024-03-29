const mongoose = require("mongoose");
const submitroute = require('./submit.route');
const {Schema}= mongoose;

let user = new Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    number:{
        type: Number
    },
    email:{
        type: String
    },
    description:{
        type: String
    }
},
{
    collection: "submit"
});
module.exports= mongoose.model("submit",user);