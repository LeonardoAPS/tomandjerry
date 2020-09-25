// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


chrome.runtime.onInstalled.addListener(function() {
  //***************** Start DEBUG  
  console.log(">>> Starting addEventListener for chrome.runtime.onInstalled...");
  //***************** End DEBUG  

  let editMode = {value: false};

    //set variable in the session
  chrome.storage.sync.set({"editMode": editMode}, function() {
    //***************** Start DEBUG 
    console.log("Edit Mode Enable:"+ JSON.stringify(editMode));
    //***************** End DEBUG 
  });

  //Chrome method to be used when a new page is changed
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        //***************** Start DEBUG  
        console.log(">>> Starting removeRules for chrome.declarativeContent.onPageChanged...");
        //***************** End DEBUG  

        //add a rule to be applied for this extension
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({        
            //pageUrl: {hostEquals: developer.chrome.com}
            //,css: [elements]
          })
          ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
  });

//param to hold the runtime tab
var runtimeTabId;

//Chrome method to be used when a new tab is created/updated
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab)
{
    //***************** Start DEBUG
    console.log(">>> Starting addListener for chrome.tabs.onUpdated...");
    //***************** End DEBUG

    if(runtimeTabId==tabId && "complete" == tab.status)
    {   
      //***************** Start DEBUG
      console.log(">>> Closing tab: "+tabId);
      //***************** End DEBUG    

      //close the tab, once is loaded
      chrome.tabs.remove(tab.id);
    }
});

//Chrome method to be used when messages are sent to the Chrome tabs level
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //***************** Start DEBUG
    console.log(">>> Starting addListener for chrome.runtime.onMessage...");
    //console.log(sender.tab ?  "from a content script:" + sender.tab.url : "from the extension");
    //***************** End DEBUG

    //get the url configured in the extension
    chrome.storage.sync.get(['server'], function(result) {
      //***************** Start DEBUG
      console.log(">>> Starting callback from chrome.storage.sync.get...");
      console.log("Tab to be open at:'"+result.server.url+"'");
      //***************** End DEBUG

     //open a new tab in Chrome
      chrome.tabs.create({ url : result.server.url, active: false }, function(tab){                
          //***************** Start DEBUG
          console.log(">>> Starting callback from chrome.tabs.create...");
          //***************** End DEBUG
          
          //set the newly tab id to close after is loaded
          runtimeTabId = tab.id;
        });

    });

    //shake hands with the message sent and send back another msg
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

//Chrome method to be called every time you try to open a page or submit link
/*
chrome.webRequest.onBeforeRequest.addListener(
  function(details)
  {
    var gonogo = {cancel: false};

    --check the edit mode variable
    chrome.storage.sync.get(['editMode'], function(response) {

      --set the value
      gonogo = {cancel: response.editMode.value};
      console.log("Enable Mode: "+JSON.stringify(gonogo));
    });
    return gonogo},
    {
      urls: ["<all_urls>"]
    },
    ["blocking"]);
*/