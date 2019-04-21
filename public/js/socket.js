$(function () {
  var socket = io();

  $('form').submit(function(e) {
    e.preventDefault(); // prevents page reoloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('user connected', function() {
    $('#messages').append($('<li>').text('~ a user has joined ~'));
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('user disconnected', function() {
    $('#messages').append($('<li>').text('~ a user has left ~'));
  });
});
