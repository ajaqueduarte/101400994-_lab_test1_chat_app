$(document).ready(function() {
    $('#join-room-form').on('submit', function(e) {
      e.preventDefault();
      // Retrieve username and selected room from the form
      const username = $('#username').val().trim();
      const room = $('#room').val();
  
      // Check if the username is not empty
      if (username) {
        // Store the username and room in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('room', room);
        
        // Redirect to the chat room page
        window.location.href = 'chat.html';
      } else {
        alert('Please enter a username');
      }
    });
  });
  