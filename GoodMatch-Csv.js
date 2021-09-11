var parse = require('csv-parse');
var fs = require('fs');

var csvData=[];

var gender = [];

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

var filterd1 = [];

fs.createReadStream('data/sample.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        //do something with csvrow
        csvData.push(csvrow);  
    })
    .on('end',function() {
        //do something with csvData
        //console.log(csvData);
        var count = 1;
        for (var i = 0; i < csvData.length; i++) {

        filterd1[i] = csvData[i].toString();
        filterd1[i] = filterd1[i].substring(0, filterd1[i].length - 3);

        if(i + 1 < csvData.length){
            calculate(filterd1[i].toString(), filterd1[i].toString())
            sentence = filterd1[i].toString() + " matches " + filterd1[filterd1.length - 1].toString();
            console.log(sentence + " " + matchPercentage + goodMatch)
        } 
      }
      
    });