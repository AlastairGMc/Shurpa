      function gotoPage(url){
	alert(url);
      	window.location.href = url;
      }

      function clk(divID){
	var div = document.getElementById(divID);
	div.style.display = (div.style.display == &#39;none&#39; ? &#39;block&#39; : &#39;none&#39;);
      }
