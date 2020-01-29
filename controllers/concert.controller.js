const Concert = require('../models/concert.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSIngle = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (!conc) res.status(404).json({ message: 'There is no such concert' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postSingle = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.jason({ messages: 'concert saved' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateSingle = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const conc = await Concert.findById(req.params.id);
    if (conc) {
      conc.performer = performer;
      conc.genre = genre;
      conc.price = price;
      conc.day = day;
      conc.image = image;
      await conc.save();
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
    const conc = await Concert.findById(req.params.id);
    if (!conc) res.status(404).json({ message: 'Not Found' });
    else {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
