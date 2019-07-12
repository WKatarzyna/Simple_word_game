function Users () {



}
Users.prototype.qCreateUser = function (e) {
    const inputUser = document.querySelector('.name');
    let inputValue = inputUser.value;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    let time =`${(String(hours).length < 2 ? '0' + hours : hours)}:${(String(minutes).length < 2 ? '0' + minutes : minutes)}:${(String(seconds).length < 2 ? '0' + seconds : seconds)}`;
    console.log(time)
    today = mm + '/' + dd + '/' + yyyy + " " + time;


    e.preventDefault();

    if(inputValue !== "" && inputValue !== null && inputValue !== undefined) {
        let request = dataBase.db.transaction(['player'], "readwrite")
            .objectStore('player')
            .add({name: `${inputValue}`, wins:0, looses:0, current: 'NO', date: today, lHistory: [], wHistory: []});


        request.onsuccess = function (e) {
            appObject.FillUsersSelect();
            //wywołać appObject.FillUsersSelect
            console.log('Data was written successfully!');
        }

        request.onerror = function (e) {
            console.log('Data was not written successfully!');
        }
    }

}
Users.prototype.qSelectCurrentUser = function (value) {

    // const select = document.querySelector('#userList');
    const currentUser = value;
    console.log(currentUser)
    // let current='yes';
    // let today =  new Date();
    // let dd = String(today.getDate()).padStart(2, '0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = today.getFullYear();
    // today = mm + '/' + dd + '/' + yyyy;

    let transaction = dataBase.db.transaction(['player'], 'readwrite');
    let store = transaction.objectStore('player');
    let index = store.index('name');
    let request = index.get(value);

    request.onsuccess = function (e) {

        let result = e.target.result;
        if (result) {

            let id = request.result.id ;
            let looses = request.result.looses ;
            let wins = request.result.wins;
            let current = 'yes';
            let date = request.result.date
            let looseHistory = request.result.lHistory
            let winHistory =request.result.wHistory

            let data = dataBase.db.transaction(['player'], 'readwrite')
                .objectStore('player')
                .put({ id: id,
                    name: `${value}`,
                    wins: wins,
                    looses: looses,
                    current:current,
                    date:date,
                    lHistory: looseHistory,
                    wHistory:winHistory

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
Users.prototype.qCreateRanking = function () {

    let objectStore = dataBase.db.transaction('player').objectStore('player');
    let tBody = document.querySelector('tbody');
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    objectStore.openCursor().onsuccess = function( event) {
        let cursor = event.target.result;
        if (cursor) {

            let tr = document.createElement('tr');
            tBody.appendChild(tr);
            let tdLP =document.createElement('td');
            let tdId = document.createElement('td');
            let tdName = document.createElement('td');
            let tdWins = document.createElement('td');
            let tdLooses = document.createElement('td');
            let tdDate = document.createElement('td');
            tr.appendChild(tdId);
            tr.appendChild(tdLP)
            tr.appendChild(tdName);
            tr.appendChild(tdWins);
            tr.appendChild(tdLooses);
            tr.appendChild(tdDate);

            for(let i =1; i<= tBody.rows.length; i++){
                tdLP.textContent = "Lp. " + i.toString(10);
            }
            tdId.textContent ="User Id: " + cursor.key;
            tdId.dataset.name = 'list';
            tdId.classList.add('id');
            tdLP.dataset.lp ='lp';
            tdLP.classList.add('lp')
            tdName.textContent = "Name: " + cursor.value.name;
            tdName.dataset.name =`${cursor.value.name}`;
            tdName.classList.add('name')
            tdWins.textContent = "Wins: " + cursor.value.wins;
            tdWins.dataset.wins =`${cursor.value.wins}`;
            tdWins.classList.add('wins');
            tdLooses.textContent = "Looses: " +cursor.value.looses;
            tdLooses.dataset.wins =`${cursor.value.looses}`;
            tdLooses.classList.add('looses');

            tdDate.textContent = "Date played: " +cursor.value.date;
            tdDate.dataset.wins =`${cursor.value.date}`;
            tdDate.classList.add('looses');
            cursor.continue();


        }
    }


}

Users.prototype.qShowUserDetail= function(e){

console.log("działa");
e.preventDefault();
    let objectStore = dataBase.db.transaction('player').objectStore('player');
    let tBody = document.querySelector('tbody');
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    objectStore.openCursor().onsuccess = function( event) {
        let cursor = event.target.result;
        if (cursor) {


                let tr = document.createElement('tr');
                tBody.appendChild(tr);
                let tdId = document.createElement('td');
                let tdName = document.createElement('td');
                let tdDate = document.createElement('td');
                let tdlHistory = document.createElement('td');
                let tdwHistory = document.createElement('td');
                tr.appendChild(tdId);
                tr.appendChild(tdName);
                tr.appendChild(tdwHistory);
                tr.appendChild(tdlHistory);
                tr.appendChild(tdDate);


                tdId.textContent = "User Id: " + cursor.key;
                tdId.dataset.name = 'list';
                tdName.textContent = "Name: " + cursor.value.name;
                tdName.dataset.name = `${cursor.value.name}`;
            if(cursor.value.wHistory === undefined)
            {tdwHistory.textContent = "Wins: ";
            }
            else {
                tdwHistory.textContent = "Wins: " + cursor.value.wHistory;
            }
            if(cursor.value.lHistory === undefined)
            { tdlHistory.textContent = "Looses: ";

            }

            else {
                tdlHistory.textContent = "Looses: " + cursor.value.lHistory;
            }

                tdDate.textContent = "Date played: " + cursor.value.date;
                tdDate.dataset.wins = `${cursor.value.date}`;
                tdDate.classList.add('looses');
                cursor.continue();
            }


        }



}