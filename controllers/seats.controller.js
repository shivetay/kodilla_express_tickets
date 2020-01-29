const Seat = require('../models/seat.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSingle = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'There is no such seat' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postSingle = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const newSeat = new Seat({
      seat: seat,
      client: client,
      email: email,
      day: day,
    });
    await newSeat.save();
    req.io.emit('seatsUpdated', db.seats);
    res.jason({ messages: 'seat saved' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateSingle = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const oneSeat = await Seat.findById(req.params.id);
    if (oneSeat) {
      oneSeat.seat = seat;
      oneSeat.client = client;
      oneSeat.day = day;
      oneSeat.email = email;
      await oneSeat.save();
      res.json({ message: 'OK ' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteSingle = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not Found' });
    else {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
