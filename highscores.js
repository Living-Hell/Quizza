const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// console.log(highScores);
// console.log(highScoresList);

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score"><h4>Level-${score.difficulty}: ${score.name} - ${score.score} (${score.category})</h4></li>`;
    })
    .join("");