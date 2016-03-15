// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/messages',
  init: function() {},
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
      dataType: 'json'
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  addMessage: function(message) {
    var $chat = $('<div class="poop">');
    var $usr = $('<span>').text(message.username);
    var $msg = $('<p>').text(message.text);
    $chat.append($usr, $msg);
    $('#chats').append($chat);
  },
  addRoom: function(roomname) {
    var $room = $('<option>').attr('value', roomname);
    $room.text(roomname);
    $('#roomSelect').append($room);
  },
  addFriend: function() {

  }
};   
var load = function () {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    dataType: 'json'
  }).done(function(data) {
    $('#chats').html('');
    _.each(data.results, function(chat) {
      var $chat = $('<div class="poop">');
      var $msg = $('<p>').text(chat.text);
      $chat.append($msg);
      $('#chats').append($chat);
    }); 
  });
};

var someData = JSON.stringify({
  text: 'hmm',
  roomname: 'this one'
});

var submitData = function(data) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: data
  });
};

$(document).ready(function() {
  $('#submit-btn').on('click', function() {
    var message = $('#message').val();
    var dataObj = {};
    dataObj.text = message;
    submitData(JSON.stringify(dataObj));
    return false;
  });
});


load();

setInterval(load, 5000);