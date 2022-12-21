let fs = require('fs');

let string = fs.readFileSync("Tolstoy Leo. War and Peace - royallib.com.txt").toString();
let template = fs.readFileSync("template.txt").toString();

//console.log(string);
//console.log(template);

let positions = new Array();
let count = 0;

function brudeForce(){
	let start = new Date().getTime();
	for (i = 0; i < string.length; i++){
		for (j = 0; j < template.length; j++){
			if (string.charAt(i) == template.charAt(j)){
				count += 1;
				i += 1;
				if (count == template.length){
					positions.push(i - template.length);
					count = 0;
					i -= template.length;
				}
			} else {
				count = 0;
				i -= j;
				break;
			}
		}
	}
	let end = new Date().getTime();
	let time = end - start;
	console.log(positions);
	console.log('Time for Brude Force: ' + time);
}

console.log('Brude force:');
//let start = new Date().getTime();
brudeForce();
//let end = new Date().getTime();
//let time = end - start;
//console.log('Time for Brude Force: ' + time);

let hashTemplate = 0;
let hashString = 0;
let index = 0;
count = 0;
let positionsHash = new Array();
let alph = new Array();
function hash(){
	start = new Date().getTime();
	for (i = 0; i < template.length; i++){
		hashTemplate += template.charCodeAt(i);
	}
	for (j = 0; j < string.length; j++){
		hashString += string.charCodeAt(j);
		alph.push(string.charAt(j));
		if (hashString == hashTemplate){
			for (u = 0; u < template.length; u++){
				if (string.charAt(index) == template.charAt(u)){
					count += 1;
					index += 1;
					if (count == template.length){
						positionsHash.push(index - template.length);
						count = 0;
						index -= (u);
						hashString -= string.charCodeAt(index - 1);
						alph.shift();
					}
				} else {
					count = 0
					index -= (u - 1);
					hashString -= string.charCodeAt(index - 1);
					alph.shift();
					break;
				}
			}
		} else if ((hashString > hashTemplate) || (alph.length == template.length)) {
			hashString -= string.charCodeAt(index);
			alph.shift();
			index += 1;			
		}
	}
	let end = new Date().getTime();
	let time = end - start;
	console.log(positionsHash);
	console.log('Time for Hash: ' + time)
}

console.log('Hash:');
//start = new Date().getTime();
hash();
/*end = new Date().getTime();
time = end - start;
console.log('Time for Hash: ' + time);*/