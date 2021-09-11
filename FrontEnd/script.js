const firstName = document.getElementById("firstName");
const secondName = document.getElementById("secondName");
const result = document.getElementById("result");

var matchPercentage = "value";
var goodMatch;
var matchCompareValue;
var sentence = name1 + " matches " + name2;
var name1 = "zonke";
var name2 = "ekie";


const enterFirstName = prompt("Enter the first name");
const enterSecondName = prompt("Enter the second name");

firstName.innerText = enterFirstName;
secondName.innerText = enterSecondName;


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

var calculation = calculate(enterFirstName, enterSecondName);


if (enterFirstName && enterSecondName) {
  result.innerHTML = `<div class="result"><h3>${enterFirstName} matches ${enterSecondName} <span class="">${matchPercentage}</span> 
  <span class="">${goodMatch}</span></h3></div>`;
} else {
  result.innerHTML =
    "<h3 class='result text-red'>Please Give Your Name And Your Partner Name</h3>";
    const enterFirstName = prompt("Enter the first name");
    const enterSecondName = prompt("Enter the second name");
}
