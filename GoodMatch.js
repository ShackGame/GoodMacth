var name1 = "zonke";
var name2 = "ekie";

var matchPercentage = "value";
var sentence; 

var matchCompareValue;
var goodMatch;

function countChars(str1, str2) {
	// body...
	var combinedString = str1 + "matches" + str2;

	var strAllChars = "";
	var strCount = "";

	for (var c1 of combinedString.split(",").join("")) {
		// statement
		if(strAllChars.indexOf(c1) < 0){

			var count = 0;

			for (var c2 of combinedString.split(",").join("")){
				if(c1 == c2){
					count = count + 1;					
				}
			}
			strAllChars = strAllChars + c1;
			strCount = strCount + count.toString();
		}	
	}
	return strCount;
}

function shortenNumber(str) {
	// body...
	var shortenString = "";

	if(str.length >= 2){
		var int1 = parseInt(new String(str.split('')[0]).toString());
		var int2 = parseInt(new String(str.split('')[str.length - 1]).toString());

		var str2 = (int1 + int2).toString();

		shortenString = str2 + shortenNumber(str.substring(1, str.length - 1));
	}else {
		return str;
	}

	return shortenString;
}

function calculate (str1, str2) {
	// body... 
	var shortString = countChars(str1, str2);
	var output = shortString;
	var output2;
	
	

	do{
		shortString = shortenNumber(shortString);
		if(shortString.length == 2){

			output = output + "\n";
			
		}
		output = output + shortString;
	}while (shortString.length > 2);
	

	output = output + "%";
	matchPercentage = output.substring(output.length - 3, output.length);

	matchCompareValue = matchPercentage.substring(matchPercentage.length - 3,matchPercentage.length - 1);

	//see if the match percentage was above 80%
	if(matchCompareValue > 80){
		goodMatch = ", good match";
	}else {
		goodMatch = "";
	}

	return output;
}

//Calculate the two provided names match percentage
var calculation = calculate(name1, name2);

//Output the sentence 
//console.log(sentence + " " + matchPercentage + goodMatch)

matchNames();

var firstNum, secondNum;

function readLine (line) {
  if (line !== "\n" && isAlphabetsOnly(firstNum)) {
    if (!firstNum) {
        firstNum = line;  
        console.log("Enter second name: ");
    } else {
        secondNum = line;
        if(isAlphabetsOnly(secondNum)){
        	sentence = firstNum + " matches " + secondNum;
        	var calculation = calculate(firstNum, secondNum);
        	console.log(sentence + " " + matchPercentage + goodMatch)
        	process.exit();
        }else {
        	errorAndExit(secondNum);
        }
    }
  }else{
  	errorAndExit(firstNum);
  }
}

function isAlphabetsOnly (name) {
	// body... 
	if (!/[^a-zA-Z]/.test(name))
		return true;
	else
		return false	
}

function errorAndExit (invalidName) {
	// body... 
	console.log("Invalid Input: "+ invalidName + 
		"\n enter only alphabetic characters.");
	
  	process.exit();
  	matchNames();
}

function matchNames(){
	var readline = require('readline');

	process.stdin.setEncoding('utf8');
	var rl = readline.createInterface({
  		input: process.stdin,
  		terminal: false
	});

	console.log("Enter first name: ");
	rl.on('line', readLine);
}


