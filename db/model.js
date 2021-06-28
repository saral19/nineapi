const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    tags:[{
        type:String
    }]
})
const Article = new mongoose.model("Article",articleSchema)

module.exports = Article;