export function useIDb(dbName, storeName, method, obj) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);
    let db;
    let transaction;
    let objStore;

    request.onupgradeneeded = function (event) {
      // create object store called "pending" and set autoIncrement to true
      db = event.target.result;
      db.createObjectStore(storeName, {
        autoIncrement: true
      });
    };

    request.onerror = function (event) {
      console.log("Woops! " + event.target.errorCode);
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      transaction = db.transaction(storeName, "readwrite");
      objStore = transaction.objectStore(storeName);
    
      db.onerror = function(e) {
        console.log("error");
      };
      if (method === "add") {
        objStore.add(obj);
      }
      if (method === "clear") {
        objStore.clear();
      }
      if (method === "get") {
        const all = objStore.getAll();
        all.onsuccess = function() {
          resolve(all.result);
        };
      }
      transaction.oncomplete = function() {
        db.close();
      };
    };

  })
}
