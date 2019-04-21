var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
