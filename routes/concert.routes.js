const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getSingle);

router.post('/concerts', ConcertController.postSingle);

router.put('/concerts/:id', ConcertController.updateSingle);

router.delete('/concerts/:id', ConcertController.deleteSingle);

module.exports = router;
