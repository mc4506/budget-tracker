(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons~index~indexedDb"],{

/***/ "./indexedDb.js":
/*!**********************!*\
  !*** ./indexedDb.js ***!
  \**********************/
/*! exports provided: useIDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useIDb\", function() { return useIDb; });\nfunction useIDb(dbName, storeName, method, obj) {\n  return new Promise(function (resolve, reject) {\n    var request = window.indexedDB.open(dbName, 1);\n    var db;\n    var transaction;\n    var objStore;\n\n    request.onupgradeneeded = function (event) {\n      // create object store called \"pending\" and set autoIncrement to true\n      db = event.target.result;\n      db.createObjectStore(storeName, {\n        autoIncrement: true\n      });\n    };\n\n    request.onerror = function (event) {\n      console.log(\"Woops! \" + event.target.errorCode);\n    };\n\n    request.onsuccess = function (event) {\n      db = event.target.result;\n      transaction = db.transaction(storeName, \"readwrite\");\n      objStore = transaction.objectStore(storeName);\n\n      db.onerror = function (e) {\n        console.log(\"error\");\n      };\n\n      if (method === \"add\") {\n        objStore.add(obj);\n      }\n\n      if (method === \"clear\") {\n        objStore.clear();\n      }\n\n      if (method === \"get\") {\n        var all = objStore.getAll();\n\n        all.onsuccess = function () {\n          resolve(all.result);\n        };\n      }\n\n      transaction.oncomplete = function () {\n        db.close();\n      };\n    };\n  });\n}\n\n//# sourceURL=webpack:///./indexedDb.js?");

/***/ })

}]);