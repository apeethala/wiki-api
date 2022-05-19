const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = new mongoose.Schema({
    title:String,
    content:String
 });
 const article = mongoose.model('article', articleSchema);


app.route('/articles')
  .get((req, res) => {
    article.find(function(err,foundArticles){
        if(!err){
            console.log(foundArticles);
            res.send(foundArticles);
        }
        else {
            console.log(err);
        }
     });
  })
  .post((req, res) => {
    let articletitle=req.body.title;
    let articlecontent=req.body.content;
    console.log(articletitle+articlecontent);
    const article1=new article({
        title:articletitle,
        content:articlecontent
    });
    article1.save(function(err){
        if(!err){
            res.send("succesfully added the article");
        }
        else {
            res.send(err);
        }
    });
  })
  .delete((req, res) => {
    article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted all articles");
        }
        else {
            res.send(err);
        }
       });
  });

app.route("/articles/:articletitle")
.get((req,res) =>{
    let articletitle =req.params.articletitle;
    console.log(articletitle);
    article.findOne({title:articletitle}, function(err,foundarticle){
        if(!err){
            console.log("found"+foundarticle);
            res.send(foundarticle);
        }
        else {
            res.send(err);
        }
    });
})
.put((req,res) =>{
    let articletitle =req.params.articletitle;
    console.log(articletitle);
    article.replaceOne({title:articletitle}, 
        {title:req.body.title,content:req.body.content},
         function(err,found){
        if(!err){
            console.log("found-"+found);
            res.send("updated");
                
        }
        else {
            res.send(err);
        }
    });
})
.patch((req,res) =>{
    let articletitle =req.params.articletitle;
    console.log(articletitle);
    article.updateOne({title:articletitle}, 
        {$set:req.body},
         function(err){
        if(!err){
            //console.log("found-"+found);
            res.send("updated");
                
        }
        else {
            res.send(err);
        }
    });
})
.delete((req,res) =>{
    let articletitle =req.params.articletitle;
    console.log(articletitle);
    article.deleteOne({title:articletitle}, function(err,foundarticle){
        if(!err){
            //console.log("found"+foundarticle);
            res.send("deletedone");
        }
        else {
            res.send(err);
        }
    });
});

app.listen(3000,function(){
    console.log("server is started and running at port 3000");
});