// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let editMode = document.getElementById('editMode');

editMode.onclick = function(element) {

	//***************** Start DEBUG 
	console.log(">>> Starting function for editMode.onclick..."); 
	//***************** End DEBUG

    let selection = {value: element.target.checked};

    //set variable in the session
	chrome.storage.sync.set({"editMode": selection}, function() {
		//***************** Start DEBUG 
		console.log("Edit Mode Enable:"+selection.value);
		//***************** End DEBUG 

		//show an alert
	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	      chrome.tabs.executeScript(
	          tabs[0].id,	          
	          {code: 'alert("Edit Mode :'+ selection.value +'");'});
	    });
	});
	document.getElementById('editMode').checked = element.target.checked;
  };

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function load_options() {
  chrome.storage.sync.get(["editMode"], function(items) {
	document.getElementById('editMode').checked = items.editMode.value;
  });
}

document.addEventListener('DOMContentLoaded', load_options);