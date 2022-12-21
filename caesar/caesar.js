let fs = require('fs');
var textforcaesar = fs.readFileSync('textforcaesar.txt').toString();
var canonicalFrequency = fs.readFileSync('canonicalfrequency.txt').toString().split("\n");

function shift(txt, canonicalFrequency){
	var actualFrequency = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	for (i = 0; i < textforcaesar.length; i++){
		if ((textforcaesar[i].charCodeAt() <= 122) && (textforcaesar[i].charCodeAt() >= 97)){
			actualFrequency[textforcaesar[i].charCodeAt() - 97] += (1 / textforcaesar.length);
		} else if ((textforcaesar[i].charCodeAt() <= 90) && (textforcaesar[i].charCodeAt() >= 65)){
			actualFrequency[textforcaesar[i].charCodeAt() - 65] += (1 / textforcaesar.length);
		}
	}
	let minimumDifference = 1;
	let minimumShift = 100;

	for (s = 1; s < 26; s++){
		let difference = 0;
		for (k = 0; k < 26; k++){
			difference += Math.pow(canonicalFrequency[k] - actualFrequency[(k + s) % 26], 2);
		}
		if (difference < minimumDifference) {
			minimumDifference = difference;
			minimumShift = s;
		}
	}
	return minimumShift;
}

let codedText = "";
minimumShift = shift(textforcaesar, canonicalFrequency, 1);
for (i = 0; i < textforcaesar.length; i++){
	if ((textforcaesar[i].charCodeAt() <= 122) && (textforcaesar[i].charCodeAt() >= 97)){
		if (textforcaesar[i].charCodeAt() + minimumShift > 122){
			codedText += String.fromCharCode((textforcaesar[i].charCodeAt() + minimumShift) - 26);
		} else {
			codedText += String.fromCharCode(textforcaesar[i].charCodeAt() + minimumShift);
		}
	} else if ((textforcaesar[i].charCodeAt() <= 90) && (textforcaesar[i].charCodeAt() >= 65)){
		if (textforcaesar[i].charCodeAt() + minimumShift > 90){
			codedText += String.fromCharCode((textforcaesar[i].charCodeAt() + minimumShift) - 26);
		} else {
			codedText += String.fromCharCode(textforcaesar[i].charCodeAt() + minimumShift);
		}
	} else {
		codedText += textforcaesar[i];
	}	
}
fs.writeFileSync('codedTextForCaesar.txt', codedText);


let decodedText = "";
minimumShift = shift(textforcaesar, canonicalFrequency, 0);
for (i = 0; i < codedText.length; i++){
	if ((codedText[i].charCodeAt() <= 122) && (codedText[i].charCodeAt() >= 97)){
		if (codedText[i].charCodeAt() - minimumShift < 97){
			decodedText += String.fromCharCode((codedText[i].charCodeAt() - minimumShift) + 26);
		} else {
			decodedText += String.fromCharCode(codedText[i].charCodeAt() - minimumShift);
		}
	} else if ((codedText[i].charCodeAt() <= 90) && (codedText[i].charCodeAt() >= 65)){
		if (codedText[i].charCodeAt() - minimumShift < 65){
			decodedText += String.fromCharCode((codedText[i].charCodeAt() - minimumShift) + 26);
		} else {
			decodedText += String.fromCharCode(codedText[i].charCodeAt() - minimumShift);
		}
	} else {
		decodedText += codedText[i];
	}	
}
fs.writeFileSync('decodedTextForCaesar.txt', decodedText);