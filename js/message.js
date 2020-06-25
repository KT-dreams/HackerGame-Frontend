const BASE_URL = "http://localhost:8000";

function send() { // eslint-disable-line no-unused-vars

   var data = document.getElementById("data");
   var console_content = document.getElementById("console_content");
   
   data.onkeypress = function(event) {
      if (event.keyCode == 13 || event.which == 13) {
         
         var x = data.value;
         var result = x.split(" ");
         var command = result[0];
         var value = result[1];
         
         console_content.innerHTML += "Anonymous: $ " + x + "<br>";
         
         var http = new XMLHttpRequest();
         var url = BASE_URL + "/" + command;
         var params = JSON.stringify({
           command: command,
           value: value
         });
         http.open("POST", url, true);
         http.setRequestHeader("Content-Type", "application/json");

         http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console_content.innerHTML += this.responseText + "<br>";
            }
         };
         http.send(params);
         data.value = "";
      }
   };
}
