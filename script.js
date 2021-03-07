$(document).ready(function()
{
	$('nav a,footer a.up').click(function(e)
	{
		var elmnt = document.getElementById("content");
		elmnt.scrollIntoView();
	});
});