const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

DB = process.env.db

mongoose.connect("mongodb://127.0.0.1:27017/Games")
.then(()=>{
    console.log('connection sucessfull');
}).catch((err)=>{
    console.log("connection unsucessfull")
    console.log(err)
})

module.exports = mongoose;