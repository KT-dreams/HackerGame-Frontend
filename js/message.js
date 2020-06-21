function send() { // eslint-disable-line no-unused-vars

   var data = document.getElementById("data");

   data.onkeypress = function(event) {
      if (event.keyCode == 13 || event.which == 13) {
         
         var x = data.value;
         var result = x.split(" ");
         var command = result[0];
         var value = result[1];
         
         var http = new XMLHttpRequest();
         var url = "http://localhost:8000/" + command;
         var params = JSON.stringify({
           command: command,
           value: value
         });
         http.open("POST", url, true);
         http.setRequestHeader("Content-Type", "application/json");

         http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               add_paragraph("Anonymous $ " + x);
               add_paragraph(this.responseText);
            }
         };
         http.send(params);
         data.value = "";
      }
   };
}

function add_paragraph(text) {
     var p = document.createElement("P");
     var t = document.createTextNode(text);
     p.appendChild(t);
     document.getElementById("commands").appendChild(p);
}
