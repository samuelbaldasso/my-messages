const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use((req, res, next) => {
  console.log('First middleware')
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post)
  res.status(201).json({
    messages: 'Post added succesfully.'
  })
  next();
})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 1,
      title: 'New Post',
      content: 'This is my post...'
    },
    {
      id: 2,
      title: 'New Post',
      content: 'This is my post...'
    },
    {
      id: 3,
      title: 'New Post',
      content: 'This is my post...'
    }
  ]
  res.status(200).json({
    messages: 'Post sucessfully fetched.',
    posts: posts
  });
})

module.exports = app;
