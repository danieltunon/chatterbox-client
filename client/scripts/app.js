/*global $*/
// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/messages',
  rooms: {},
  friends: {},
  init: function() {
    $(document).ready(function() {
      app.fetch();
      $('#send').on('submit', function(e) {
        // e.preventDefault();
        app.handleSubmit();
      });
    });
  },
  send: function (data) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data)
    });
  },
  fetch: function () {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      dataType: 'json',
      complete: function(obj) {
        obj.done(function(data) {
          app.clearMessages();
          _.each(data.results, function(chat) {
            app.addMessage(chat);
            if ( chat.roomname && !app.rooms[chat.roomname] ) {
              app.addRoom(chat.roomname);
              app.rooms[chat.roomname] = true;
            }
          });
          $('.username').on('click', function() {
            app.addFriend();
          });
        });
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  addMessage: function(message) {
    var $chat = $('<div class="poop chat">');
    var $msg = $('<p>').text(message.text);
    var $usr = $('<span class="username">').text(message.username + ': ');
    $msg.prepend($usr);
    $chat.append($msg);
    $('#chats').append($chat);
  },
  addRoom: function(roomname) {
    var $room = $('<option>').attr('value', _.escape(roomname));
    $room.text(roomname);
    $('#roomSelect').append($room);
  },
  addFriend: function() {
    // var $friend =
    console.log('poop');
  },
  handleSubmit: function() {
    var message = $('#message').val();
    var dataObj = {};
    dataObj.text = message;
    app.send(dataObj);
    return false;
  }
};
// var load = function () {
//   app.fetch().done(function(data) {
//     $('#chats').html('');
//     _.each(data.results, function(chat) {
//       app.addMessage(chat);
//     });
//   });
// };

var submitData = function(data) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: data
  });
};


app.init();

// setInterval(load, 5000);
