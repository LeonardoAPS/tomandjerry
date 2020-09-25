//open a connection in the chrome body window level
//var port = chrome.runtime.connect();

//when chrome extension send internally messages in the body window level
/*
window.addEventListener("message", function(event) {
  //***************** Start DEBUG 
  console.log(">>> Starting addEventListener for message...");
  //***************** End DEBUG 

  // we only accept messages from ourselves
  if (event.source != window)
    return;

  console.log(event.data.type);

  if (event.data.type && (event.data.type == "FROM_PAGE")) {    
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);
*/

function firstElementWithClass(array, setValue)
{
  //***************** Start DEBUG 
  console.log(">>> Starting function firstElementWithClass..."); 
  //***************** End DEBUG

  //single element
  var el;
  var classname;
  var id;

  //iterate thru the elements
  for(var i=0;i<array.length;i++)
  {
    if(!classname || classname === "")
      classname = array[i].className;

    if(!id || id === "")
      id = array[i].id;

    //look for elements that have classname
    if(classname !== "" && id !== "")
    {
      //***************** Start DEBUG 
      console.log("Element found at:"+i);
      console.log("Classname:"+classname);
      console.log("ID:"+id);
      //***************** End DEBUG

      //get the values of the clicked element, save it as JSON...        
      //var location = array[i].baseURI;
      //if(location.indexOf("?")>0)
      //location = array[i].baseURI.substring(0, array[i].baseURI.lastIndexOf("?"));

      //create json
      el = {"classname": classname, "id": id};

      //if applied and confirmed by the user, store it in the extension 
      //if(confirm("Are you sure to add the element: "+ JSON.stringify(el))){}
      if(setValue)
      {
        //get the current elements store
        chrome.storage.sync.get(['element'], function(response){
            
          //get the current variable and add one more item
          var elements = response.element;

          //initiate the array
          if(elements == null)
            elements = [];

          //add the element to the array
          elements.push(el);

          //add the news
          chrome.storage.sync.set({'element': elements}, function() {
        
            //***************** Start DEBUG 
            console.log("Setting value: "+JSON.stringify(el));
            //***************** End DEBUG                   
          });          
        });
      }
      break;
    }
  }
  return el;
}

function findElement(el, callback)
{
    //***************** Start DEBUG 
    console.log(">>> Starting function findElement..."); 
    //***************** End DEBUG

    //get the current elements store
    chrome.storage.sync.get(['element'], function(response){
        //get the current variable and add one more item
        var elements = response.element;

        //iterate thryu the array
        for(var i=0;elements && i<elements.length;i++){
            var s1 = JSON.stringify(elements[i]);
            var s2 = JSON.stringify(el);

            //looking for the object
            if(s1 === s2){
              //***************** Start DEBUG
              console.log('Found element: '+ JSON.stringify(el));
              //***************** End DEBUG

              return callback(true);            
            }
        }
        //no object found
        return callback(false);
    });
}

//when user perform any submit in the website
window.addEventListener("submit", function(event) {
  //***************** Start DEBUG 
  console.log(">>> Starting addEventListener for submit..."); 
  //***************** End DEBUG 
});

//when user perform any click in the website
window.addEventListener("click", function(event) {
  //***************** Start DEBUG	
  console.log(">>> Starting addEventListener for click..."); 
  //***************** End DEBUG 

  //check the edit mode variable
  chrome.storage.sync.get(["editMode"], function(response) {

    //***************** Start DEBUG 
    console.log("Enable Mode: "+response.editMode.value);
    //***************** End DEBUG 

    //check the edit mode to add elements or to check them
    if(response.editMode.value)
    {
      //catch Tom and save data
      firstElementWithClass(event.path, true);
    }
    else
    {
      //catch Jerry and realize if the element is saved
      var currentEl = firstElementWithClass(event.path, false);

      //check the current clicked elment is already added to extension
      findElement(currentEl, (otherresponse) =>{
        //***************** Start DEBUG 
        console.log(">>> Starting callback for findElement..."); 
        //***************** End DEBUG         
        if(otherresponse){
          //call a message internaly on Chrome, because this code runs on the body window level
          chrome.runtime.sendMessage({greeting: "hello"}, function(anotherresponse) {          
            //***************** Start DEBUG 
            console.log(">>> Starting callback from chrome.runtime.sendMessage...");
            console.log(anotherresponse.farewell);
            //***************** End DEBUG 
          });
        }
      });      
    }
  });
},true);