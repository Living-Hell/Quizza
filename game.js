const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const selectedCategory = localStorage.getItem('selectedCategory');
const selectedDifficulty = localStorage.getItem('selectedDifficulty');
// console.log(selectedCategory);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

/* Fetching questions from Json file */
// fetch("questions.json")
//     .then(res => {
//         // console.log(res);
//         return res.json();
//     })
//     .then(loadedQuestions => {
//         // console.log(loadedQuestions);
//         questions = loadedQuestions
//         startGame();
//     })
//     .catch(err => {
//         console.error(err);
//     })

const fetch_URL = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;
// console.log(fetch_URL);

/*Categories*/
// const categories = [
//     "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple", //Science & Nature
//     "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple", //Computer
//     "https://opentdb.com/api.php?amount=10&category=30&difficulty=medium&type=multiple", //Gadgets
//     "https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple", //Mathematics
//     "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple", //Mythology
//     "https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple", //History
//     "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple", //Film
//     "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple", //Video Games
//     "https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&type=multiple", //Politics
//     "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple", //Music
//     "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple", //Sports
//     "https://opentdb.com/api.php?amount=10&category=29&difficulty=medium&type=multiple", //Comics
//     "https://opentdb.com/api.php?amount=10&category=26&difficulty=medium&type=multiple", //Celebrities
//     "https://opentdb.com/api.php?amount=10&category=28&difficulty=medium&type=multiple", //Animals
//     "https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple", //Anime&Manga
// ]

// const fetch_url = categories[selectedCategory-1];
// console.log(categories[selectedCategory]);

/* Fetching Questions from API(Open Trivia DB) */
fetch(fetch_URL)
    .then(res => {
        // console.log(res);
        return res.json();
    })
    .then(loadedQuestions => {
        // console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion =>{
            const formattedQuestion = {
                question : loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random()*3)+1;
            answerChoices.splice(
                formattedQuestion.answer-1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice,index) => {
                formattedQuestion["choice" + (index+1)] = choice;
            });
            return formattedQuestion;
        });
        startGame();
    })
    .catch(err => {
        console.error(err);
    });


// console.log(questions);

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);
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