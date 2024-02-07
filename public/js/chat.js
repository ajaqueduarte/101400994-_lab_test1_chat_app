$(document).ready(function() {
    const socket = io(); // Assuming you've already included socket.io in your HTML
    
    // Emit an event when a new user joins
    socket.emit('joinRoom', {
      username: localStorage.getItem('username'),
      room: localStorage.getItem('room')
    });
  
    // Listen for messages from the server
    socket.on('message', message => {
      console.log(message);
      // Display the message to the user
      $('#chat-messages').append(`<div class="message">${message}</div>`);
      // Scroll to the latest message
      $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
    });
  
    // When a user sends a message
    $('#send-btn').on('click', function() {
      const message = $('#message-input').val();
      // Emit the message to the server
      socket.emit('chatMessage', message);
      // Clear the input field
      $('#message-input').val('');
    });
  
    // Listen for "typing" events
    $('#message-input').on('input', function() {
      socket.emit('typing', { username: localStorage.getItem('username') });
    });
    
    socket.on('typing', data => {
      // Show "user is typing" message
      // You would have an element with id 'typing-message' in your HTML to show this
      $('#typing-message').text(`${data.username} is typing...`);
    });
  
    // Handle leaving the chat room
    $('#leave-btn').on('click', function() {
      const leaveRoom = confirm('Are you sure you want to leave the chat room?');
      if (leaveRoom) {
        window.location = '../index.html'; // Redirect user to home page
      }
    });
  });
  