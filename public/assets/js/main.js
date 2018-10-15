$(document).ready(function() {

  var albumBucketName = 'socialmemedia';
  var bucketRegion = 'us-east-1';

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId
    })
  });
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});
  console.log("this is linked");
    var loginForm = $(".login-form");
    var usernameInput = $("#username");
    var passwordInput = $("#password");
    
    // const AWS = require("aws-sdk");
    // const bucketName = 'socialmemedia';
    // const bucketRegion = 'us-east-1';
    // const s3 = new AWS.S3();
  
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
    };

    $("#meme-upload").on("click", function(event) {
      event.preventDefault();
      var selectedFile = document.getElementById('image-upload').files[0];
      var fileName = selectedFile.name;
      var photoKey = encodeURIComponent("test") + "/" + fileName;
      
      s3.upload({
        Key: photoKey,
        Body: selectedFile,
        ACL: 'public-read'
      }, function(err, data) {
        if (err) console.log(err);
        alert("Success");
      })
    })

    // feed.on("load", function(){
    //   var params = {Bucket: bucketName};
    //   s3.listObjects(params, function(err, data){
    //     var bucketContents = data.Contents;
    //     for (var i = 0; i < bucketContents.length; i++){
    //     var urlParams = {Bucket: 'myBucket', Key: bucketContents[i].Key};
    //       s3.getSignedUrl('getObject',urlParams, function(err, url){
    //         console.log('the url of the image is', url);
    //       });
    //     }
    //   });
    // })
});