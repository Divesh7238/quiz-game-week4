// Write your code from here!! */

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit-btn');
const scoreElement = document.getElementById('score');


async function fetchQuestions() {
    const response = await fetch('/questions');
    const questions = await response.json();
    return questions;
}


function displayQuestion(question) {
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option, question.answer));
        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++; 
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]); 
    } else {
        endQuiz(); 
    }
}


function endQuiz() {
    questionElement.textContent = 'Quiz Over!';
    optionsElement.innerHTML = '';
    submitButton.style.display = 'none';
    scoreElement.textContent = `Your Score: ${score}/${questions.length}`; 
}


let questions = [];
fetchQuestions().then(data => {
    questions = data;
    displayQuestion(questions[currentQuestionIndex]);
});