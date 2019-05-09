$(function () {
  var socket = io();

  $('form').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    $('#messages').append($('<li>').text('You: ' + $('#m').val()));
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('nickname', function() {
    var nickname = prompt('Please enter your nickname');
    if (nickname != null) {
      socket.emit('user connected', nickname);
    }
  });

  socket.on('user connected', function(nickname) {
    $('#messages').append($('<li>').text('~ ' + nickname + ' has joined ~'));
  });

  socket.on('chat message', function(user, msg) {
    $('#messages').append($('<li>').text(user + ': ' + msg));
  });

  socket.on('user disconnected', function(nickname) {
    $('#messages').append($('<li>').text('~ ' + nickname + ' has left ~'));
  });
});
