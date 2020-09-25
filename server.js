const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const port = 3000;

//initate the service
//const GuacamoleService = require('./services/GuacamoleService');
//const guacamoleService = new GuacamoleService(null);

//Prezi: giqhr8liqsox
//Gslides: 2PACX-1vTDemmzXIl2DNIFRhQPg2gMlTuXYRKejfCeN-umHZbFB3kS44YiCI3tKmm7tyv2Ua5oNzVf_pNT3HT8

//module example
//const myModule = require('./modules/module');
//console.log(myModule.createDate());
//let val = myModule.hello(); // val is "Hello" s 
//app.use('/myModule', express.static(path.join(__dirname, './static/myModule.html')));;

//calling directly an HTML file that listen for the another service
app.use('/prezi', express.static(path.join(__dirname, './static/prezi.html')));
app.use('/gslides', express.static(path.join(__dirname, './static/gslides.html')));

//calling the below JS function
app.get('/listener', function(req, res) {
  //***************** Start DEBUG 
  console.log(">>> Starting listenr service...");
  console.log('Hello from the server');
  //***************** End DEBUG 
  
  //get the HTTP param
  let id = req.query.id;

  //add the request to the app
  app.set(id,res);
});

//receives any request and proceed
app.get('/trigger', function (req, res) {
  //***************** Start DEBUG 
  console.log(">>> Starting trigger service...");
  //***************** End DEBUG    

  //get the HTTP param
  let id = req.query.id;

  //get the HTTP response page, which is a global param and proceed its load
  if(app.get(id)!=null)
    app.get(id).send();

  //returns to the page request
  return res.status(200).end();
});  

app.locals.siteName = 'Tom and Jerry Server';
app.set('trust proxy', 1);
app.use(cookieSession({ name: 'session', keys: ['Ghdur687399s7w', 'hhjjdf89s866799'],}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//to render pages using EJS
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.use( '/',routes({
    //guacamoleService
  })
);

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
