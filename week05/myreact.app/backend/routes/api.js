const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Endpoint to get questions
router.get('/questions', (req, res) => {
  const questions = require('../data/questions.json');
  res.json(questions);
});

// Endpoint to analyze answers
router.post('/analyze', analysisController.analyzeAnswers);

module.exports = router;
