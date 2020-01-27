const express = require('express');
const db = require('../db');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomPost = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomPost]);
});

router.route('/testimonials/:id').get((req, res) => {
  for (let post of db.testimonials) {
    if (post.id == req.params.id) {
      return res.json(post);
    }
  }
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newPost = { author: author, text: text, id: uuidv1() };
  db.testimonials.push(newPost);
  return res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  for (let post of db.testimonials) {
    if (post.id == req.params.id && post.author === author) {
      post.author = author;
      post.text = text;
    }
  }
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  for (let post of db.testimonials) {
    if (post.id == req.params.id) {
      db.testimonials.splice(db.testimonials.indexOf(post), 1);
    }
  }
  res.json({ message: 'OK' });
});

module.exports = router;
