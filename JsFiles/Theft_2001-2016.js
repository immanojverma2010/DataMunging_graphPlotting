	/*******Adding Required packages******/
	var fs=require('fs');
	var readline = require('readline');
	/*******Initializing Variable******/
	var jsonObj=[];
	c=0;
	ipFile="crimes2001onwards.csv"
	opFile="Graph1.json"

	/******Creating interface for Input & output*******/

	var rd = readline.createInterface({
		input: fs.createReadStream("../InputData/"+ipFile),
		output: fs.createWriteStream("../OutputData/"+opFile)
	});

	rd.on('line', function(line) {
		/*******Expression to split(use this only otherwise it would take other resources)******/
	  value=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

	if(c==0){
	c=1;	
	}

	else if(value[17]<2001 || value[17]>2016){
	;
	}
		
	else{
		/*******Creating object if it's not present(checked by fnValidate function)******/
		if(jsonObj.findIndex(fnValidate)==-1){
			var myobj={Year:value[17],over500:0,under500:0};
			jsonObj.push(myobj);
			
		}
		
		/*******Filtering Data******/
		if(value[5].toLocaleLowerCase()=="THEFT".toLocaleLowerCase() && value[6].toLocaleLowerCase()=="OVER $500".toLocaleLowerCase()){
			jsonObj[jsonObj.length-1].over500++;
		}
		else if(value[5].toLocaleLowerCase()=="THEFT".toLocaleLowerCase() && value[6].toLocaleLowerCase()=="$500 AND UNDER".toLocaleLowerCase()){
			jsonObj[jsonObj.length-1].under500++;
		}
	}

	});

	/*******Function to check if the object has been already created with this value******/
	function fnValidate(k){
	return k.Year===value[17]
	}
		
	
			

	/*******This event calls after reading all the file********/
	rd.on('close', function(){	
		
	/*******Converting data to Json and writing to file********/
		rd.output.write(JSON.stringify(jsonObj));

	console.log("Json Data Created by using \n input as '" +ipFile +"' file  and \n saved in output file as '" +opFile +"' on path 'D:\\WORKSPACE\\Js files' ");
		});



