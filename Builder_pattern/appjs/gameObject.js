
function Game () {
    this.lives = 5;
    this.qSetPwd()
    this.qStartGame();



}
Game.prototype.qSetPwd = function() {
    console.log(word.choosenWord)
    let placeholder = document.querySelector('.hold');
    placeholder.style.letterSpacing ="10px";
    for (let i = 0; i < word.choosenWord.length; i++) {

        placeholder.innerHTML +="_";
    }

}
Game.prototype.qStartGame = function (value) {
    const selectUser = document.querySelector('#userName');
    selectUser.textContent = value;
    let selectLive = document.querySelector('#mylives');
    let placeholder = document.querySelector('.hold');
    let substring = placeholder.textContent;
    selectLive.textContent = "Twoje życia : " + this.lives;
    let counter= 0;
    let ifFailure= document.querySelector('#failed');
    let ifCorrect = document.querySelector('#correct');
    let duplicates = [];
    let buttonsList = document.querySelectorAll('.guessBox');
    // let currentUser = JSON.parse(localStorage.getItem('user'));
    // let persons = JSON.parse(localStorage.persons);


    document.addEventListener('keydown', event => {
        const charList = 'abcdefghijklmnopqrstuvwxyz';
        let key = event.key.toLowerCase();
        if (charList.indexOf(key) === -1) return;
        let keyHolder = [];
        let keydown = 0;
        keyHolder.push(key)
        for (let j = 0; j < buttonsList.length; j++) {
            if(buttonsList[j].innerHTML == keyHolder) {
                buttonsList[j].classList.add('red');
                buttonsList[j].disabled = true;
            }}
        if (duplicates.includes(key)) {

        }
        else {
            duplicates.push(key);
            if (this.lives >= 0 && placeholder.innerHTML !== word.choosenWord) {
                for (let i = 0; i < keyHolder.length; i++) {
                    for (let j = 0; j < word.choosenWord.length; j++) {
                        if (word.choosenWord.charAt(j) === keyHolder[i]) {
                            let substring1 = substring.substring(0, j);
                            let substring2 = substring.substring(j + 1, substring.length);
                            substring = substring1 + word.choosenWord.charAt(j) + substring2;
                            placeholder.innerHTML = substring;
                            keydown = 1;
                        }
                    }
                    if (keydown === 0 && this.lives > 0) {
                        console.log(keydown);
                        let image = document.querySelector('img');
                        this.lives--;
                        counter++;
                        selectLive.textContent = "Twoje życia : " + this.lives;
                        image.src = "./images/" + counter + ".png";
                        break;

                    }
                    keydown === 1;

                    if (this.lives === 0) {
                        document.querySelector('#clue').textContent = "Przegrałeś wylosuj ponownie! Poprawnym słowem było słowo : " + word.choosenWord;
                        ifFailure.textContent = "Przegrana";
                        let elems = document.getElementsByClassName("guessBox");
                        this.qUpdateUserLooses(selectUser.textContent);

                        this.lives--;
                        for (let i = 0; i < elems.length; i++) {
                            elems[i].disabled = true;
                            elems[i].classList.add('red');
                            document.onkeydown = function (e) {
                                e.preventDefault();
                            }//blokada inputu
                        }


                    } else if (placeholder.innerHTML === word.choosenWord) {
                        document.querySelector('#clue').textContent = " Brawo! Wygrałeś!";
                        ifCorrect.textContent = "Wygrana";
                        let elems = document.getElementsByClassName("guessBox");
                        this.qUpdateUserWins(selectUser.textContent);
                        for (let i = 0; i < elems.length; i++) {
                            elems[i].disabled = true;
                            elems[i].classList.add('red');
                            document.onkeydown = function (e) {
                                e.preventDefault();
                            }
                        }

                    }
                }
            }
    }
    });
}

Game.prototype.qUpdateUserLooses = function(value) {
    let looseArr = [];
    // let lword =JSON.parse(window.localStorage.getItem('test'));
    let tloose =[];
    let objectStore = dataBase.db.transaction('player').objectStore('player');
    objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {

            if(cursor.value.current ==='yes') {
                tloose = cursor.value.lHistory;
                console.log(tloose)
                console.log(tloose[0])
                console.log("tablica po wyciagnieciu z bazy")
                if(tloose[0]=== undefined){

                }
                else {
                    looseArr=tloose;
                }

                cursor.continue();
            }
        }
    };

    let transaction = dataBase.db.transaction(['player'], 'readwrite');
    let store = transaction.objectStore('player');
    let index = store.index('name');
    let request = index.get(value);

    request.onsuccess = function (e) {

        let result = e.target.result;
        if (result) {


            looseArr.push(word.choosenWord);
            // localStorage.setItem("test", JSON.stringify( looseArr));


            let id = request.result.id ;
            let looses = request.result.looses ;
            let wins = request.result.wins;
            let current = 'yes';
            let date = request.result.date
            let winHistory = request.result.wHistory

            let data = dataBase.db.transaction(['player'], 'readwrite')
                .objectStore('player')
                .put({ id: id,
                    name: `${value}`,
                    wins: wins,
                    looses: looses +1,
                    current:current,
                    date:date,
                    wHistory:winHistory,
                    lHistory:looseArr

                });

           data.onsuccess = function (event) {
                console.log('The data has been updated successfully');
            };

            data.onerror = function (event) {
                console.log('The data has been updated failed');
            }

             // request.result.looses.put({looses: +1 });

        }
    }


}
Game.prototype.qUpdateUserWins = function(value) {
    let winArr = [];
    // let lword =JSON.parse(window.localStorage.getItem('test'));
    let twin =[];
    let objectStore = dataBase.db.transaction('player').objectStore('player');
    objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {

            if(cursor.value.current ==='yes') {
                twin = cursor.value.wHistory;

                console.log("tablica po wyciagnieciu z bazy")
                if(twin[0]=== undefined){

                }
                else {
                    winArr=twin;
                }

                cursor.continue();
            }
        }
    };


    let transaction = dataBase.db.transaction(['player'], 'readwrite');
    let store = transaction.objectStore('player');
    let index = store.index('name');
    let request = index.get(value);

    request.onsuccess = function (e) {

        let result = e.target.result;
        if (result) {


            winArr.push(word.choosenWord);
            // localStorage.setItem("test", JSON.stringify( looseArr));


            let id = request.result.id ;
            let looses = request.result.looses ;
            let wins = request.result.wins;
            let current = 'yes';
            let date = request.result.date
            let looseHistory = request.result.lHistory

            let data = dataBase.db.transaction(['player'], 'readwrite')
                .objectStore('player')
                .put({ id: id,
                    name: `${value}`,
                    wins: wins +1,
                    looses: looses,
                    current:current,
                    date:date,
                    lHistory: looseHistory,
                    wHistory:winArr

                });

            data.onsuccess = function (event) {
                console.log('The data has been updated successfully');
            };

            data.onerror = function (event) {
                console.log('The data has been updated failed');
            }

            // request.result.looses.put({looses: +1 });

        }
    }



}
