const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Endpoint to fetch questions
router.get('/questions', (req, res) => {
  // If your questions.json file is in backend/data/ use:
  const questions = require('../data/questions.json');
  // If your questions.json is still in backend/components/data/, then change the path:
  // const questions = require('../components/data/questions.json');
  res.json(questions);
});

// Endpoint to analyze answers and compute career match
router.post('/analyze', analysisController.analyzeAnswers);

module.exports = router;
