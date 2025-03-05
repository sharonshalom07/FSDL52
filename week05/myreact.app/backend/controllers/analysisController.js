const questions = require('../data/questions.json');
const careers = require('../data/careers.json');

exports.analyzeAnswers = (req, res) => {
  const { answers } = req.body;  
  // Expected format:
  // answers: [
  //   { questionId: 1, selectedOption: 0 },
  //   { questionId: 2, selectedOption: 1 },
  //   ...
  // ]

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Initialize scores for each career
  const scores = {};
  careers.forEach(career => {
    scores[career.name] = 0;
  });

  // Calculate scores by iterating through each answer
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      const option = question.options[answer.selectedOption];
      if (option && option.weights) {
        // Each option has weights for different careers
        for (const [career, weight] of Object.entries(option.weights)) {
          scores[career] = (scores[career] || 0) + weight;
        }
      }
    }
  });

  // Determine the best match (career with highest score)
  let bestCareer = null;
  let maxScore = -Infinity;
  for (const [career, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCareer = career;
    }
  }

  // Retrieve matched career details
  const matchedCareer = careers.find(c => c.name === bestCareer);

  res.json({ matchedCareer, scores });
};
