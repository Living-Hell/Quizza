const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

// console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which is the brightest star in the sky?",
        choice1: "Betelgeuse",
        choice2: "Sirius",
        choice3: "Sun",
        choice4: "Polestar",
        answer: 2
    },
    {
        question: "What is the name of our galaxy?",
        choice1: "Milky Way",
        choice2: "Solar System",
        choice3: "Andromeda",
        choice4: "Jupiter",
        answer: 1
    },
    {
        question: "What is the age of our Universe?",
        choice1: "4.2 billion years",
        choice2: "4.2 million years",
        choice3: "13.6 billion years",
        choice4: "13.6 million years",
        answer: 3
    }
]

// console.log(questions);

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`; 
    // Update the progress bar
    // console.log(questionCounter/MAX_QUESTIONS);
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS*100)}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        // console.log(number);
        choice.innerText = currentQuestion["choice" + number];        
    });

    availableQuestions.splice(questionIndex,1);
    // console.log(availableQuestions);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        // console.log(selectedAnswer == currentQuestion.answer);

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        // console.log(classToApply);

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {

            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        },750);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


startGame();