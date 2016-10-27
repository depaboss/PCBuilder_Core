var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//CONNESSION DATABASE MONGOLAB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds061196.mlab.com:61196/test_1', function(err){
  if(err){
    throw err;
  }
  console.info("database connesso");
});

//SETUP DEL SERVER EXPRESS
var app = express();

//MIDDLEWARE BODY PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//FAVICON
app.use(require('serve-favicon')(path.join(__dirname,"..","client","favicon.ico")));

//SERVE I FILE STATICI
app.use('/', express.static(path.join(__dirname, '..', 'client')));

//SERVE GLI SCRIPT DENTRO NODE MODULES, PER IL CLIENT
app.use('/scripts', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/bundle', express.static(path.join(__dirname, '..', 'build', 'App')));
app.use('/vendor', express.static(path.join(__dirname, '..', 'build','vendors')));

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//LE NOSTRE API
// app.use('/heroes',require('./Esemp_Heroes'));
// app.use('/computer', require('./computers'));
// app.use('/netbooks', require('/netbooks'));
app.use('/components', require('./components'));

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//SERVE SEMPRE L'INDEX.HTML IN QUALSIASI ALTRO CASO FUORI DALLE API
app.get('/',function(req, res){
  res.sendFile(path.join(__dirname,"..","build","index.html"));
});

/////////////////////////////////////////////////////////////////////////////////
//START SERVER
app.listen(3000, function(){
  console.log('server express start on: http://localhost:' + 3000);
});

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//LIVERLOAD
livereload = require('livereload');
server = livereload.createServer();
server.watch(path.join(__dirname, '..', 'client', '**', '*'));
