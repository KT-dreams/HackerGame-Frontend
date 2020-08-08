const BASE_URL = "http://localhost:8000";

function inputHandler() {
	var data = document.getElementById("data");
	var console_content = document.getElementById("console_content");
}

function send() { // eslint-disable-line no-unused-vars   
	var data = document.getElementById("data");
	var console_content = document.getElementById("console_content");
	data.onkeypress = function(event) {
	  var command;
	  var myArr = new Object();
	  
      if(event.keyCode == 13 || event.which == 13) { // TODO: what is event.which?
         
         var x = data.value;
         var result = x.split(" ");
         
         var value;
         var params;
         
         if(myArr["dataRequest"] && result.length == 1) {
        	 value = result[0];
        	 params = JSON.stringify({
        		 request_uuid: value
                });
        	 console_content.innerHTML += myArr['dataRequest']['info'] + " " + "<br>";
         }
         
    	 command = result[0];
         value = result[1];
         
         params = JSON.stringify({
             command: command,
             value: value
           });
         console_content.innerHTML += "Anonymous: $ " + x + "<br>";
         
         var http = new XMLHttpRequest();
         var url = BASE_URL + "/" + command;

         http.open("POST", url, true);
         http.setRequestHeader("Content-Type", "application/json");

         http.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
               myArr = JSON.parse(this.responseText);
               
               if(myArr['data']) {
            	   
            	   console_content.innerHTML += myArr['data'] + "<br>";
               }
               if(myArr['dataRequest']) {
            	   
            	   current_command.innerHTML = myArr['dataRequest']['info'];
            	   
            	   if(myArr['dataRequest']['type'] == 'password')
        		   {
            		   data.attributes["type"].value = "password";
        		   }
               } else {
            	   
            	   current_command.innerHTML = "Anonymous: $ ";
            	   data.attributes["type"].value = "text";
               }
            	   
            }
         };
         http.send(params);
         data.value = "";
      }
   };
}
