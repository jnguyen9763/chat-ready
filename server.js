var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.broadcast.emit('user connected');

  socket.on('chat message', function(msg) {
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('user disconnected');
  });
});

http.listen(PORT, function() {
  console.log('listening on ' + PORT);
});
