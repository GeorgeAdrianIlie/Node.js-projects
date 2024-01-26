const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

/////////////// All articles ////////////////

app.route("/articles")
.get(function(req, res) {
  Article.find(function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})
.post(function(req, res) {

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err) {
    if (!err) {
      res.send("New article posted succesfully");
    } else {
      res.send(err);
    }
  });
})
.delete(function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Deleted succesfully all articles");
    } else {
      res.send(err);
    }
  });
});

/////////////// A particular article ////////////////

app.route("/articles/:aricleTitle")
.get(function(req, res) {
  Article.findOne({title: req.params.aricleTitle},function(err, foundArticle) {
    if (!err) {
      res.send(foundArticle);
    } else {
      res.send(err);
    }
  });
})
.put(function(req, res) {
  Article.update(
    {title: req.params.aricleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err) {
    if (!err) {
      res.send("Succesfully updated article.");
    } else {
      res.send(err);
    }
  });
})
.patch(function(req, res) {
  Article.update(
    {title: req.params.aricleTitle},
    {$set: req.body},
    function(err, foundArticle) {
      if (!err) {
        res.send("Succesfully updated article.");
    } else {
      res.send(err);
    }
  });
})
.delete(function(req, res){
  Article.deleteOne({title: req.params.aricleTitle},function(err){
    if(!err){
      res.send("Deleted succesfully all articles");
    } else {
      res.send(err);
    }
  });
});


app.listen(3000, function() {
  console.log("Server has started Succesfully!");
});
