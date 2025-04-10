// quiz.mjs
import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    {
        question: "What's Node.js runtime environment written in?",
        options: ["C++", "JavaScript", "Python", "Java"],
        answer: 0
    },
    {
        question: "Which company maintains Node.js?",
        options: ["Google", "Microsoft", "OpenJS Foundation", "Apache"],
        answer: 2
    }
];

async function startQuiz() {
    let score = 0;
    
    for (const [index, q] of questions.entries()) {
        console.log(chalk.yellow(`\nQuestion ${index + 1}: ${q.question}`));
        q.options.forEach((opt, i) => console.log(`${i + 1}. ${opt}`));
        
        const answer = await askQuestion(`Your answer (1-${q.options.length}): `);
        
        if (parseInt(answer) - 1 === q.answer) {
            console.log(chalk.green("Correct!"));
            score++;
        } else {
            console.log(chalk.red("Wrong!"));
        }
    }
    
    console.log(chalk.blue(`\nFinal Score: ${score}/${questions.length}`));
    rl.close();
}

function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

startQuiz();