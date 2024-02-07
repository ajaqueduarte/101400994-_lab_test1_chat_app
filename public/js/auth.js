$(document).ready(function() {
    // Handle user signup
    $('#signup-form').on('submit', function(e) {
      e.preventDefault();
      // Get the user details from the form
      const userDetails = {
        username: $('#username-signup').val().trim(),
        password: $('#password-signup').val(),
        firstname: $('#firstname-signup').val().trim(),
        lastname: $('#lastname-signup').val().trim()
      };
      
      // Send the user details to the server
      $.ajax({
        type: 'POST',
        url: '/api/auth/signup',
        data: userDetails,
        success: function(response) {
          // Handle response from the server
          if (response.success) {
            alert('Signup successful');
            window.location.href = 'login.html';
          } else {
            alert(response.msg);
          }
        }
      });
    });
  
    // Handle user login
    $('#login-form').on('submit', function(e) {
      e.preventDefault();
      // Get the username and password from the form
      const userDetails = {
        username: $('#username-login').val().trim(),
        password: $('#password-login').val()
      };
  
      // Send the login details to the server
      $.ajax({
        type: 'POST',
        url: '/api/auth/login',
        data: userDetails,
        success: function(response) {
          // Handle response
          if (response.success) {
            // Store user details in localStorage or session
            localStorage.setItem('user', JSON.stringify(response.user));
            window.location.href = 'index.html'; // Redirect to the room selection page
          } else {
            alert(response.msg);
          }
        }
      });
    });
  
    // Handle user logout
    $('#logout-btn').on('click', function() {
      localStorage.removeItem('user'); // Clear user data
      window.location.href = 'login.html'; // Redirect to login page
    });
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
  });
  