let fs = require('fs');
let arg = process.argv;
let mode = arg[2];
let fileToRead = arg[3];
let fileToWrite = arg[4];
let string = fs.readFileSync(fileToRead, "utf-8");
let count = 1; answer = ''; compression = 0;

//КАЗАЧЕНКО ПОЛИНА КНМО-101

if (mode == "code") {
	for (i = 1; i <= string.length; i++){
		if (string.charAt(i - 1) == '#'){
			if (string.charAt(i) == '#'){
				count += 1
			} else {
				while (count > 255){
					answer += ('#' + String.fromCharCode(255) + string.charAt(i - 1))
					count -= 255
				}
				if (count > 9){
					answer = answer + '#' + String.fromCharCode(count) + string.charAt(i - 1)
					count = 1
				} else {
					answer = answer + '#' + '[' + count + ']' + '#'
					count = 1
				}
			}
		} else if (string.charAt(i) == string.charAt(i - 1)){
			count += 1;
			while (count > 255){
				answer += ('#' + String.fromCharCode(255) + string.charAt(i - 1))
				count -= 255
			}
		} else if (count < 4) {
			for (j = 0; j < count; j++){
				answer += string.charAt(i - 1)
			}
			count = 1
		} else {
			if (count > 9){
				answer = answer + '#' + String.fromCharCode(count) + string.charAt(i - 1)
			} else {
				answer = answer + '#' + '[' + count + ']' + string.charAt(i - 1)
			}
			count = 1
		}
	}
	fs.writeFileSync(fileToWrite, answer)
	compression = (string.length) / (answer.length)
	console.log('Коэффициент сжатия = ', compression)
} else if (mode == "decode"){
	for (i = 0; i < string.length - 2; i++){
		if (string[i] == "#" && string[i + 1] == "[" && string[i + 3] == "]"){
			for (j = 0; j < string[i + 2]; j++){
				answer += string[i + 4]
			}
			i += 4
		} else if (string[i] == "#"){
			for (j = 0; j < string[i + 1].charCodeAt(); j++){
				answer += string[i + 2]
			}
			i += 2
		} else {
			answer += string[i]
		}
	}
	fs.writeFileSync(fileToWrite, answer)
	compression = (string.length) / (answer.length)
} else if (mode == "compare") {
	let string2 = fs.readFileSync(fileToWrite, "utf-8");
	console.log(string == string2)
}
