const express = require('express');
const db = require('../db');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  for (let post of db.concerts) {
    if (req.params.id == post.id) {
      return res.json(post);
    }
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newPost = {
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
    id: uuidv1(),
  };
  db.concerts.push(newPost);
  return res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  for (let post of db.concerts) {
    if (
      post.id == req.params.id &&
      post.performer === performer &&
      post.day === day
    ) {
      post.performer = performer;
      post.genre = genre;
      post.price = price;
      post.day = day;
      post.image = image;
    }
  }
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  for (let post of db.concerts) {
    if (post.id === req.params.id) {
      db.concerts.splice(db.concerts.indexOf(post), 1);
    }
  }
  res.json({ message: 'OK' });
});

module.exports = router;
