(window.webpackJsonp=window.webpackJsonp||[]).push([["commons~index~indexedDb"],[,function(e,n,o){"use strict";function r(e,n,o,r){return new Promise((function(t,c){var s,u,i,d=window.indexedDB.open(e,1);d.onupgradeneeded=function(e){(s=e.target.result).createObjectStore(n,{autoIncrement:!0})},d.onerror=function(e){console.log("Woops! "+e.target.errorCode)},d.onsuccess=function(e){if(s=e.target.result,u=s.transaction(n,"readwrite"),i=u.objectStore(n),s.onerror=function(e){console.log("error")},"add"===o&&i.add(r),"clear"===o&&i.clear(),"get"===o){var c=i.getAll();c.onsuccess=function(){t(c.result)}}u.oncomplete=function(){s.close()}}}))}o.r(n),o.d(n,"useIDb",(function(){return r}))}]]);