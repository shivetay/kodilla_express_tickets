const uuidv1 = require('uuid/v1');
const express = require('express');

const db = require('../db');

const router = express.Router();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  // const result = db.seats.filter(seat => seat.id == req.params.id);

  for (let post of db.seats) {
    if (req.params.id == post.id) {
      return res.json(post);
    }
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  for (let post of db.seats) {
    if (post.day === day && post.seat === seat) {
      return res.json({ message: 'This seat is already taken' });
    }
  }

  const newPost = {
    day: day,
    seat: seat,
    client: client,
    email: email,
    id: uuidv1(),
  };
  db.seats.push(newPost);
  req.io.emit('seatsUpdated', db.seats);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  for (let post of db.seats) {
    if (post.day === day && post.seat === seat && post.id != req.params.id) {
      return res.json({
        message: 'This is not your seat',
      });
    }
  }
  for (let post of db.seats) {
    if (
      post.id == req.params.id &&
      post.client === client &&
      post.seat === seat
    ) {
      post.day = day;
      post.seat = seat;
      post.client = client;
      post.email = email;
      break;
    }
  }
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  for (let post of db.seats) {
    if (post.id === req.params.id) {
      db.seats.splice(db.seats.indexOf(post), 1);
    }
  }
  res.json({ message: 'OK' });
});

module.exports = router;
