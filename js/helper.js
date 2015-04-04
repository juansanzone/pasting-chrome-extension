var user_a = 'p';
var hash_a = 'f5f9b9df0edfdd6111fd7367630b5';
var siteUrl = 'http://pasting.io/';
var apiUrl = 'http://api.pasting.io';

function createPaste() 
{
  var text = $('.pastingInput').val();
  if (text) {
    $(".create").html("<div class='spinner'></div>");
    getCookies(siteUrl, "u", function(response) 
    {
        if (response != null) 
        {
          getCookies(siteUrl, "v", function(response2) {
            if (response2 != null) {
              newPaste(text, response2 + ':' + response);
            }
          });
        } else {
          newPaste(text, hash_a + ':' + user_a);
        }
    });
  }
}

function newPaste(text, credentials) 
{
  $.ajax({
      type: 'POST',
      url: apiUrl + '/createFromExtension',
      data: {'v': credentials, 'text': text},
      contentType: "application/x-www-form-urlencoded;",
      success: function (response) 
      {
          if (response.st == "ok") 
          {
            var link = siteUrl + response.username + "/" + response.documentId;
            $('.link').html("<a href='" + link + "' target='_blank'>" + link + "</a>");
            $(".create").html("Create");
          } else {
            $('.link').html(response.error);
            $(".create").html("Create");
          }
          
          getCookies(siteUrl, "u", function(user) {
            if (user != null) {
              $('.username').html('Hello ' + user + ' !');
            }
          });
      }
  });
}

function getCookies(domain, name, callback) 
{
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
             callback(cookie ? cookie.value : null);
        }
    });
}
