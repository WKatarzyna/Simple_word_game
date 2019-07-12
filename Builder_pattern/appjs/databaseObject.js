const dataB = function() {
    this.databaseName = 'Szubienica';
    this.version = 1;
    this.qcreateDB()
}

dataB.prototype.qcreateDB = function() {
    let t = this;
    if (!('indexedDB' in window)) {
        console.log(`This browser doesn't support IndexedDB`);
    }
    let request = window.indexedDB.open(this.databaseName, this.version);
    request.onerror = function (e) {
        console.log('Database is opened failed!');
    }
    request.onsuccess = function (e) {
        t.db = request.result;
        console.log('Database is opened successfully!');
        const btnSubmit = document.querySelector('.useradd');;
        btnSubmit.disabled = false;
        appObject.FillUsersSelect();

    }

    request.onupgradeneeded = function (e) {
        db = e.target.result;
        let objectStore;
        if (!db.objectStoreNames.contains('player')) {
            objectStore = db.createObjectStore('player', {keyPath: 'id', autoIncrement:true});
            objectStore.createIndex('name', 'name', {unique: true});
            objectStore.createIndex('wins', 'wins', {unique: false});
            objectStore.createIndex('looses', 'looses', {unique: false});
            objectStore.createIndex('current', 'current', {unique: false});
            objectStore.createIndex('date', 'date', {unique: false});
            objectStore.createIndex('lHistory', 'lHistory', {unique: false, multiEntry: true});
            objectStore.createIndex('wHistory', 'wHistory', {unique: false, multiEntry: true});
            // objectStore.createIndex('word', 'word', {unique: false});
        }
    }

}



