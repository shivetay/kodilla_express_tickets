const express = require('express');
const router = express.Router();

const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.getAll);

router.get('/seats/:id', SeatsController.getSingle);

router.post('/seats', SeatsController.postSingle);

router.put('/seats/:id', SeatsController.updateSingle);

router.delete('/seats/:id', SeatsController.deleteSingle);

module.exports = router;
