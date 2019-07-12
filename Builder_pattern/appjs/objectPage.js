//--------------------Game page constructor --------------------------------------
function Page(htmlElement) {
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    }, false);

    this.qLogPage(htmlElement);
    document.querySelector('.start').addEventListener('click', event => appObject.moveToGameSection(event, htmlElement));

}
//---------------------Loging Page-----------------------------------------
Page.prototype.qLogPage =function(htmlElement){
    const loginSection = document.createElement('div');
    loginSection.id='loginSection';
    const content  = document.createElement('section');
    const input  = document.createElement('input');
    const header = document.createElement('h1');
    const startButton = document.createElement('button');
    const addBtn = document.createElement('button');
    const users  = document.createElement('section');
    const selectUsers  = document.createElement('select');
    const usersRanking  = document.createElement('section');
    const btnDisplayRanking  = document.createElement('button');
    const btnDisplayDetails  = document.createElement('button');
    btnDisplayRanking.textContent= 'Show statistic';
    btnDisplayDetails.textContent= 'Show Details';
    btnDisplayRanking.classList.add('ranking');
    btnDisplayDetails.classList.add('details');

    const usersTable = document.createElement('table');
    const tableHead = document.createElement('theader');
    const tableBody = document.createElement('tbody');

    const tr = document.createElement('tr');
//----------------------------------------------------------------------------------------------
    loginSection.appendChild(content);
    loginSection.appendChild(header);
    loginSection.appendChild(startButton);
    loginSection.appendChild(users);


    users.appendChild(input);
    users.append(addBtn);
    users.appendChild(selectUsers);
    loginSection.appendChild(usersRanking);
    usersRanking.appendChild(btnDisplayRanking);
    usersRanking.appendChild(btnDisplayDetails);
    usersRanking.appendChild(usersTable);
    usersTable.appendChild(tableHead);
    tableHead.appendChild(tr);
    usersTable.appendChild(tableBody);
    // tr.appendChild(thId);
    // tr.appendChild(thLP);
    // tr.appendChild(thName);
    // tr.appendChild(thWins);
    // tr.appendChild(thLooses);
    // thId.textContent ='ID ';
    // thLP.textContent ='Lp';
    // thName.textContent ='Name';
    // thWins.textContent ='Wins';
    // thLooses.textContent ='Looses';
    input.classList.add('name');
    input.id= "newUser";
//------------------------------------------------------------------------------------------------
    content.classList.add('content');
    addBtn.classList.add('useradd');
    startButton.classList.add('start');
    selectUsers.id ='userList';
    usersRanking.id ='usersRanking';
//------------------------------------------------------------------------------------------------
    header.textContent="HangMan Game";
    startButton.textContent="Nowa gra";
    selectUsers.textContent='Users list :';
    // h3.textContent ='Statystyki :';
    addBtn.value ='user';
    addBtn.type='button';
    addBtn.textContent='Dodaj';
    input.placeholder="Dodaj użytkownika";
    input.type="text";
    htmlElement[0].appendChild(loginSection);

    document.querySelector('.ranking').addEventListener('click', event => usersList.qCreateRanking(event, htmlElement));
    document.querySelector('.details').addEventListener('click', event => usersList.qShowUserDetail(event, htmlElement));

}

//---------------------Game Page ---------------------
Page.prototype.qGeneratePage= function(htmlElement) {
    const gameSection = document.createElement('div');
    const menuButton = document.createElement('button');

    const liveHolder = document.createElement('p');
    const userHolder = document.createElement('p');
    const userResults = document.createElement('section');
    const displayWin = document.createElement('p');
    const displayLoose = document.createElement('p');
    const header = document.createElement('h1');
    const displayPassword = document.createElement('div'); //wyświetlenie hasła
    const displayBoard = document.createElement('div');
    const hangman = document.createElement('img');

//--------------------------------------------------------------------------
    gameSection.appendChild(menuButton);
    gameSection.appendChild(liveHolder);
    gameSection.appendChild(userHolder);
    gameSection.appendChild(userResults);
    gameSection.appendChild(displayWin);
    gameSection.appendChild(displayLoose);
    gameSection.appendChild(header);

    gameSection.appendChild(displayPassword);
    gameSection.appendChild(displayBoard);
    gameSection.appendChild(hangman);
//styling game page elements-------------------------------------------------
    gameSection.id ='gameSection'
    menuButton.classList.add('menu');
    displayBoard.classList.add('wrapper');
    menuButton.id ='#menu';
    liveHolder.id ='mylives';
    userHolder.id ='userName';
    displayWin.id ='correct';

    displayLoose.id ='failed';
    hangman.classList.add('hangman');
//adding context to game page elements-----------------------------------------
    displayPassword.classList.add('hold'); //wyświetlenie hasła
    liveHolder.textContent ='Twoje życia: ';
    menuButton.textContent='Menu';
    header.textContent='Wybierz literę i znajdź słowo';
    hangman.src ="./images/0.png";
    htmlElement[0].appendChild(gameSection);
    document.querySelector('.menu').addEventListener('click', event => appObject.moveToLogingSection(event, htmlElement));
}
// --------------------drawing Game board -----------------------------------------
Page.prototype.qCreateBoard = function (){
    const letters = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    let board = document.querySelector('.wrapper');
    for( let i = 0 ; i < 26; i ++){
        let box = document.createElement('button');
        board.appendChild(box);
        box.classList.add('guessBox');
        box.id = i+ 1;
        box.textContent = letters[i];
        letters[i] ++;
    }
}






