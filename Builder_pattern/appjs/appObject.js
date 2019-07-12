let page, game, word, usersList, newUser,dataBase

let AppObject = function AppObject (htmlElement){
   this.CreatePageObject(htmlElement)
    page = new Page(htmlElement);
    dataBase = new dataB();
    usersList = new Users();
    this.CreateUsers();


};
AppObject.prototype = {
    CreatePageObject: function(htmlElement){
    },
    CreateUsers: function (){
        const btnSubmit = document.querySelector('.useradd');
        btnSubmit.addEventListener('click', usersList.qCreateUser);

    },
    FillUsersSelect : function (){
        // usunąć zawaretość i odczytać z bazy wszystkich użytkowników i dodać ich w pętli do option
        const select = document.querySelector('#userList');
        while (select.firstChild) {
            select.firstChild.remove(); //usuniecie zawartości select
        }
        let objectStore = dataBase.db.transaction('player').objectStore('player');
        objectStore.openCursor().onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor){
                    const select = document.querySelector('#userList');
                    const option = document.createElement('option');
                    option.value = `${cursor.value.name}`;
                    option.textContent = `${cursor.value.name}`;
                    select.appendChild(option)
                    cursor.continue();
            }
        };
    },

    moveToGameSection: function(event, htmlElement){

        const loginSection = document.querySelector('#loginSection');
        const select = document.querySelector('#userList');
        const currentUser = select.value;
        usersList.qSelectCurrentUser(select.value);
        htmlElement[0].removeChild(loginSection);
        page.qGeneratePage(htmlElement);
        word = new randWordObject();
        word.qGenerateWord();
        word.choosenWord;
        page.qCreateBoard();
        game = new Game();
        game.qStartGame(currentUser);

    },
    moveToLogingSection: function(event, htmlElement) {
        location.reload(true)
        this.FillUsersSelect();
        const gameSection = document.querySelector('#gameSection');
        htmlElement[0].removeChild(gameSection);
        page.qLogPage(htmlElement);
        // const select = document.querySelector('#userList');
        // // while (select.firstChild) {
        // //     select.firstChild.remove(); //usuniecie zawartości select
        // // }
        // localStorage.removeItem('user');
    },

}