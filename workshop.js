/*	workshop.js	*/

      function gotoPage(lst) {
      	window.location.href = lst.value;
      }

      function clk(divID){
	var div = document.getElementById(divID);
	div.style.display = (div.style.display == &#39;none&#39; ? &#39;block&#39; : &#39;none&#39;);
      }
