const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const selectedCategory = localStorage.getItem('selectedCategory');
const selectedDifficulty = localStorage.getItem('selectedDifficulty');
questionsAvailable = localStorage.getItem('questionsAvailable');
const noQues = document.getElementById('noQues');

const categories = [
    "General Knowledge","Books","Film","Music","Musicals &amp; Theatres","Television","Video Games","Board Games",
    "Science &amp; Nature","Computers","Mathematics","Mythology","Sports","Geography","History","Politics","Art",
    "Celebrities","Animals","Vehicles","Comics","Gadgets","Japanese Anime &amp; Manga","Entertainment: Cartoon &amp; Animations"
]

// localStorage.setItem('highScores',JSON.stringify([]));
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// console.log(highScores);

const MAX_HIGH_SCORES = 5;

if(questionsAvailable === "false"){
    finalScore.innerText = "OOPS!";
    noQues.innerText = "No question available for this category and difficulty level."
    // console.log('questionsAvailable');
}else{
    noQues.innerText = "Congratulations!"
    finalScore.innerText = mostRecentScore;
    // console.log('questionsAvailable');    
}

username.addEventListener("keyup", () => {
    // console.log(username.value);
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e =>{
    // console.log("Clicked save button!");
    e.preventDefault();

    const score = {
        score : mostRecentScore,
        name : username.value,
        category: categories[selectedCategory-9],
        difficulty: selectedDifficulty
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');

    // console.log(highScores);
    // console.log(score); 
}