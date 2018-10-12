$(document).ready(function() {
  console.log("this is linked");
    var loginForm = $(".login-form");
    var usernameInput = $("#username");
    var passwordInput = $("#password");
  
    loginForm.submit(function(event) {
      console.log('yuss')
      event.preventDefault();
      var profileData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      loginUser(profileData.username, profileData.password);
      usernameInput.val("");
      passwordInput.val("");
    });
  
    function loginUser(username, password) {
      console.log(username);
      console.log(password);
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