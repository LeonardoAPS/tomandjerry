// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// Saves options to chrome.storage
function save_options() {
  //***************** Start DEBUG 
  console.log(">>> Starting save_options method..."); 
  //***************** End DEBUG

  var serverURL = {url: document.getElementById('server').value};
  chrome.storage.sync.set({"server": serverURL}, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Show options to chrome.storage
function show_options() {
  //***************** Start DEBUG 
  console.log(">>> Starting show_options method..."); 
  //***************** End DEBUG

  var status = document.getElementById('status');
  status.textContent = 'Everything cleared.';  

  chrome.storage.sync.get(["element"], function(items) {
    // Get the element and show the storage fields
    var status = document.getElementById('status');
    status.textContent = JSON.stringify(items.element);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function clear_options() {
  //***************** Start DEBUG 
  console.log(">>> Starting clear_options method..."); 
  //***************** End DEBUG

   chrome.storage.sync.remove(["element"], function() {
    var status = document.getElementById('status');
    status.textContent = 'Server Options Cleared.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function clearall_options() {
  //***************** Start DEBUG 
  console.log(">>> Starting clearall_options method..."); 
  //***************** End DEBUG

   chrome.storage.sync.clear(function() {
    var status = document.getElementById('status');
    status.textContent = 'Everything cleared.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(["server"], function(items) {
    document.getElementById('server').value = items.server.url;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('show').addEventListener('click', show_options);
document.getElementById('clear').addEventListener('click', clear_options);
document.getElementById('clearall').addEventListener('click', clearall_options);