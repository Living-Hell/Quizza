const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');

category.onchange = () =>{
    const categ = category[category.selectedIndex].value;
        localStorage.setItem('selectedCategory',categ);
        // console.log(categ);
}

difficulty.onchange = () =>{
    const diff = difficulty[difficulty.selectedIndex].value;
        localStorage.setItem('selectedDifficulty',diff);
        // console.log(diff);
}