	/*******Adding Required packages******/
	var fs=require('fs');
	var readline = require('readline');
	/*******Initializing Variable******/
	var jsonObj=[];
	c=0;
	ipFile="crimes2001onwards.csv"
	opFile="Graph2.json"

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
			var myobj={Year:value[17],Arrest:0,Not_Arrested:0};
			jsonObj.push(myobj);
			
		}
		
		/*******Filtering Data******/
		if(value[5].toLocaleLowerCase()==="ASSAULT".toLocaleLowerCase() && value[8].toLocaleLowerCase()==="TRUE".toLocaleLowerCase()  ){
			jsonObj[jsonObj.length-1].Arrest++;
		}
		else if(value[5].toLocaleLowerCase()==="ASSAULT".toLocaleLowerCase() && value[8].toLocaleLowerCase()==="FALSE".toLocaleLowerCase()  ){
			jsonObj[jsonObj.length-1].Not_Arrested++;
		}

	
		
		}
		
	});

	/*******Function to check if the object has been already created with this value******/
		function fnValidate(k){
			return k.Year===value[17]
		}	
	/*******This event calls after reading all the data(end of file)********/
	rd.on('close', function(){	
		
	/*******Converting data to Json and writing to file********/
		rd.output.write(JSON.stringify(jsonObj));

	console.log("Json Data Created by using \n input as '" +ipFile +"' file  and \n saved in output file as '" +opFile +"' on path 'D:\\WORKSPACE\\Js files' ");
		});



