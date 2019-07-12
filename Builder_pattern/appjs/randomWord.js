function randWordObject (){
    this.categories = [["kot", "lew", "kapibara"],
        [ "madryt", "amsterdam", "praga"],
        [ "ptaki"]
    ];
}
//-------------------- generating Word and categories ---------------------------------------------------------------------------------
randWordObject.prototype.qGenerateWord = function(){
    let chosenCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
    let word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    console.log(word);


    const displayCat = document.createElement('p');
    displayCat.id='clue';
    document.querySelector('#gameSection').appendChild(displayCat);

    if (chosenCategory === this.categories[0]) {
        displayCat.textContent= "Wybrana kategoria: zwięrzeta";
    } else if (chosenCategory === this.categories[1]) {
        displayCat.textContent = "Wybrana kategoria: miasta";
    } else {
        displayCat.textContent = "Wybrana kategoria: film";
    }
    // return word;
    this.choosenWord = word;

}



