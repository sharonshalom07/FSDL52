const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '../data/questions.json');
const careersPath = path.join(__dirname, '../data/careers.json');

exports.analyzeAnswers = (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Load questions and careers dynamically
    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
    const careers = JSON.parse(fs.readFileSync(careersPath, 'utf8'));

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
  } catch (error) {
    console.error('Error processing analysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
