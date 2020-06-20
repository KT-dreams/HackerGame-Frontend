function send() {

var data = document.getElementById("data");

data.onkeypress = function(event) {
	if (event.keyCode == 13 || event.which == 13){
		
		var dat = data.value;
		var result = dat.split(" ");
		var command = result[0];
		var value = result[1];
		
	    var http = new XMLHttpRequest();
	    var url = 'http://localhost:8000/' + command;
	    var params = 'command=' + command + '&value=' + value;
	    http.open("POST", url, true);

	    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	   	http.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				myFunction('Anonymous $ ' + dat);
				myFunction(this.responseText);
			}
		};
		http.send(params);
		data.value = '';
	};
}
}

function myFunction(text) {
	  var para = document.createElement("P");
	  var t = document.createTextNode(text);
	  para.appendChild(t);
	  document.getElementById("commands").appendChild(para);
}
