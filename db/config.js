require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONNECTION_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log("Connection establshed with db")
}).catch((e) =>{
    console.log("No Connection with db")
})