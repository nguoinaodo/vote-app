'use strict';
/*
var appUrl = window.location.origin;
var ajaxFunctions = {
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
};
*/

var appUrl = window.location.origin;

function ready(fn) {
   if (typeof(fn) !== 'function')
      return;
   if (document.readyState === 'complete')
      return fn();
   document.addEventListener('DOMContentLoaded', fn, false);
}

function ajaxRequest(method, url, callback) {
   var xhr = new XMLHttpRequest();
   
   xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
         callback(JSON.parse(xhr.responseText));
      }
   };
   
   xhr.open(method, url, true);
   xhr.send();
}

function ajaxPost(url, postData, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200)
            callback(JSON.parse(xhr.responseText));
    };
    
    xhr.onerror = function() {
        alert('err');  
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.send(postData);
}
