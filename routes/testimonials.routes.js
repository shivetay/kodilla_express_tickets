const express = require('express');
const router = express.Router();

const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.getAll);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.get('/testimonials/:id', TestimonialsController.getSingle);

router.post('/testimonials', TestimonialsController.postSingle);

router.put('/testimonials/:id', TestimonialsController.updateSingle);

router.delete('/testimonials/:id', TestimonialsController.deleteSingle);

module.exports = router;
