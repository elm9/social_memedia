$(document).ready(function() {
    var loginForm = $(".login-form");
    var usernameInput = $("#username");
    var passwordInput = $("#password");
  
    loginForm.on("#submit", function(event) {
      event.preventDefault();
      var profileData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!profileData.username || !userData.password) {
        return;
      }
  
      loginUser(profileData.username, profileData.password);
      usernameInput.val("");
      passwordInput.val("");
    });
  
    function loginUser(username, password) {
      $.post("/api/login", {
        username: username,
        password: password
      }).then(function(data) {
        window.location.replace(data);
      }).catch(function(err) {
        console.log(err);
      });
    }
  
  });