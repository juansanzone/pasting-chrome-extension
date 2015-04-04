$(function() 
{
	$('.create').click(function(){
		createPaste();
	});

  	getCookies(siteUrl, "u", function(user) {
    	if (user != null) {
    		$('.username').html('Hello ' + user + ' !');
    	}
	});

});
