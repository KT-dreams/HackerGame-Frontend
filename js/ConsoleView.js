export default class ConsoleView {
	constructor(userActionController) {
	    this.userActionController = userActionController;
	    this.ACTION_MAPPING = {
	            "login": this.userActionController.login
	    };
	    
		this.data = document.getElementById("data");
		this.commandPrefix = document.getElementById("commandPrefix");
		this.setUserInputDefaults();
	}

	setUserInputDefaults() {
		this.data.addEventListener("keypress", this.inputHandler);
	    this.commandPrefix = 'Anonymous: $ ';
	    this.data.attributes["type"].value = "text";
	}

	prepareRequest(messageOptions) {
		this.data.removeEventListener("keypress", this.inputHandler);
	    this.commandPrefix.innerHTML = messageOptions["info"];
	    this.data.attributes["type"].value = messageOptions["type"];
	}

	isEnterPressed(event) {
		return event.key !== 'Enter';
	}

	inputHandler = (event) => {
    	if(this.isEnterPressed(event))
    		return;

		let result = this.data.value.split(" ");
		let command = result[0];
		let commandArgs = result.slice(1);

		this.ACTION_MAPPING[command](...commandArgs);
	}
}
/*
//////////////////////////////////////////////////////////////////////////
          let myArr = new Object();
	      if(event.keyCode == 13 || event.which == 13) {
	         var result = data.value.split(" ");
	         
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
}*/