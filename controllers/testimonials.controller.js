const Testimoniall = require('../models/testimonials.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimoniall.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimoniall.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testi = await Testimoniall.findOne().skip(rand);
    if (!testi) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.json(err);
  }
};

exports.getSingle = async (req, res) => {
  try {
    const testi = await Testimoniall.findById(req.params.id);
    if (!testi)
      res.status(404).json({ message: 'There is no such testimonial' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postSingle = async (req, res) => {
  const { author, text } = req.body;
  try {
    const newTestimoniall = new Testimoniall({
      author: author,
      text: text,
    });
    await newTestimoniall.save();
    res.jason({ messages: 'testimoniall saved' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateSingle = async (req, res) => {
  const { author, text } = req.body;

  try {
    const testi = await Testimoniall.findById(req.params.id);
    if (testi) {
      testi.author = author;
      testi.text = text;
      await testi.save();
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
    const testi = await Testimoniall.findById(req.params.id);
    if (!testi) res.status(404).json({ message: 'Not Found' });
    else {
      await Testimoniall.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
