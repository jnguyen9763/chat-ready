$(function () {
  var socket = io();
  var typing = false;
  var timeout = undefined;

// https://stackoverflow.com/questions/16766488/socket-io-how-to-check-if-user-is-typing-and-broadcast-it-to-other-users
  $('form').keydown(function() {
    if (!typing && event.which != 13) {
      typing = true;
      socket.emit('is typing');
      timeout = setTimeout(timeoutFunction, 5000);
    }
    if (typing) {
      clearTimeout(timeout);
      if (event.which == 13) {
        timeoutFunction();
      } else {
        timeout = setTimeout(timeoutFunction, 5000);
      }
    }
  });

  socket.on('is typing', function(user) {
    console.log(user + ' is typing');
  });

  socket.on('stop typing', function(user) {
    console.log(user + ' stopped typing');
  });

  function timeoutFunction() {
    typing = false;
    socket.emit('stop typing');
  }

  $('form').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    if ($('#m').val() != '') {
      $('#messages').append($('<li>').text('You: ' + $('#m').val()));
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
    }
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
