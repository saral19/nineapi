require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./db/config')
const Article = require('./db/model')
app.use(express.json())
app.post("/articles",async (req,res) =>
{
    try
    {
        const article = new Article(req.body);
        const createArticle = await article.save();
        res.status(201).send("Insertion Completed")
    }catch(error)
    {
        res.status(400).send("Invalid input Paramaters")
    }
})

app.get("/articles/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        const article = await Article.find({id:id});
        if(!article)
        {
            res.status(400).send("article not found");
        }
        else
        {
            res.status(200).send(article)
        }
    }catch(error)
    {
        res.status(503).send("Unable to connect to db");
    }
})
app.get("/tags/:tagName/:date",async (req,res) =>
{
    try{
        var date = req.params.date;
        var date1 = date.substr(0,4) + '-' + date.substr(4,2) + '-' + date.substr(6,2) 
        const article = await Article.find({"date":{$eq:date1},tags:{$in:[req.params.tagName]}});
        const count = article.length;
        const array1 = article.map(a=>a.id);
        var tags = [];
        for(let i=0;i<article.length;i++)
        {
            for(let j=0;j<article[i].tags.length;j++)
            {
                tags.push(article[i].tags[j]);
            }
        }
        Array.prototype.remove = function(value) {
            for (var i = this.length; i--; )
            {
                if (this[i] === value) {
                    this.splice(i, 1);
                }
            }
        } 
        tags.remove(req.params.tagName)
        let uniqueTags = [...new Set(tags)]
        const output = {
            "tag":req.params.tagName,
            "count":count,
            "articles":array1,
            "related_tags":uniqueTags
        }
        res.status(200).send(output)
    }catch(error)
    {
        res.status(503).send("Unable to connect to db");
    }
})
app.listen(port,() =>
{
    console.log("Connection established");
})