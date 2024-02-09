const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/db");
const mongoose = require("mongoose");

const uri = `mongodb+srv://sam:N26X4jyjUoezb5Ko@cluster0.4hwli.mongodb.net/node-angular?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected succesfully");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json({
      messages: "Post added succesfully.",
      postId: result._id,
    });
  });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ messages: "Not found!" });
    }
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((data) => {
    res.status(200).json({
      messages: "Post sucessfully fetched.",
      posts: data,
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({
      messages: "Post succesfully updated.",
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      messages: "Post succesfully deleted.",
    });
  });
});

module.exports = app;
