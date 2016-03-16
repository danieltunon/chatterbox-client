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
        app.handleSubmit();
        e.preventDefault();
      });
      $('#roomSelect').on('change', function(e) {
        var selected = $(this).find('option:selected');
        if ( selected.attr('id') === 'allmessages' ) {
          app.fetch();
        } else {
          app.fetch(selected.text());
        }
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
  fetch: function (filter) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      dataType: 'json',
      // data: {'where':JSON.stringify({"roomname":"yellow"})},
      data: {'where': JSON.stringify({ 'roomname': filter })},
      complete: function(obj) {
        obj.done(function(data) {
          app.clearMessages();
          app.clearRooms();
          _.each(data.results, function(chat) {
            // if ( filter === undefined ) {
            app.addMessage(chat);
            // } else if ( filter === chat.roomname ) {
              // app.addMessage(chat);
            // };
            if ( chat.roomname && !app.rooms[chat.roomname] ) {
              if ( chat.roomname === filter ) {
                app.addRoom(chat.roomname, 'selected');
              } else {
                app.addRoom(chat.roomname);
              }
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
  clearRooms: function() {
    app.rooms = {};
    $('#roomSelect').empty();
    $('#roomSelect').append($('<option id="allmessages">All messages</option>'));
  },
  addMessage: function(message) {
    // var $tab = $('<div class=')
    var $chat = $('<div class="poop chat">');
    var $msg = $('<p>').text(message.text);
    var $usr = $('<span class="username">').text(message.username + ': ');
    $msg.prepend($usr);
    $chat.append($msg);
    $('#chats').append($chat);
  },
  addRoom: function(roomname, selected) {
    var $room = $('<option>').text(roomname);
    if ( selected ) {
      $room.attr('selected', 'selected');
    }
    $('#roomSelect').append($room);
  },
  addFriend: function() {
    // var $friend =
  },
  handleSubmit: function() {
    var message = $('#message').val();
    var dataObj = {};
    dataObj.text = message;
    dataObj.username = 'some string';
    dataObj.roomname = 'nsfw';
    app.send(dataObj);
    app.fetch();
  }
};

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

// var load = function () {
//   app.fetch().done(function(data) {
//     $('#chats').html('');
//     _.each(data.results, function(chat) {
//       app.addMessage(chat);
//     });
//   });
// };

// setInterval(load, 5000);
