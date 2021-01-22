export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

// IndexedDB helper function to eestablish db connection
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to db `shop-shop` w/ version of 1
    const request = window.indexedDB.open('shop-shop');

    // create vars to hold reference to the db, transaction (tx), and object store
    let db, tx, store;

    // if version changes, or if first time using the db, run this method and create 3 object stores
    request.onupgradeneeded = function(e) {
      const db = request.result;
      // create object store for each type of data and set "primary" key index to be `_id` of data
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // handle any connection errors
    request.onerror = function(e) {
      console.log('There was a connection error');
    };

    // on db open success
    request.onsuccess = function(e) {
      // save a reference of the db to the `db` var
      db = request.result;
      // open a transaction to do whatever we pass into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, 'readwrite');
      // save a reference to that object store
      store = tx.objectStore(storeName);

      // notify of errors
      db.onerror = function(e) {
        console.log('error', e);
      };

      // check which method value is selected and perform that on the object store
      switch(method) {
        case 'put': 
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // upon transaction completion, close db connection
      tx.oncomplete = function() {
        db.close();
      };
    };

  });
}
