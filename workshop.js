/*  workshop.js */

function gotoPage(url){
	window.location.href = url;
}

function clk(divID){
	var div = document.getElementById(divID);
	div.style.display = (div.style.display == 'none' ? 'block' : 'none');
}
