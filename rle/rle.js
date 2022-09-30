let fs = require('fs');
let arg = process.argv;
let inText;
let count = 1; answer = ''; compression = 0;

//КАЗАЧЕНКО ПОЛИНА КНМО-101

fs.readFile('input.txt', (err, data) => {
	string = data.toString()
	for (i = 1; i <= string.length; i++){
		if (string.charAt(i - 1) == '#'){
			if (string.charAt(i) == '#'){
				count += 1
			} else {
				if (count > 32){
				answer = answer + '#' + String.fromCharCode(count) + string.charAt(i - 1)
				count = 1
				} else if (count == 127){
				answer = answer + '#' + String.fromCharCode(count) + string.charAt(i - 1)
				count = 1
				} else {
				answer = answer + '#' + '[' + count + ']' + '#'
				count = 1
				}
			}
		} else if (string.charAt(i) == string.charAt(i - 1)){
			count += 1;
			if (count == 127){
				answer = answer + '#' + String.fromCharCode(count) + string.charAt(i - 1)
				count = 1
			}
		} else if (count == 1) {
			answer += string.charAt(i - 1)
		} else if (count < 4) {
			for (j = 0; j < count; j++){
				answer += string.charAt(i - 1)
			}
			count = 1
		} else {
			if (count > 32){
				answer = answer + '#' + String.fromCharCode(count) + string.charAt(i - 1)
			} else {
				answer = answer + '#' + '[' + count + ']' + string.charAt(i - 1)
			}
			count = 1
		}
	}
	fs.writeFileSync("output.txt", answer)
	compression = (string.length) / (answer.length)
	console.log('Исходная строка:')
	console.log(string)
	console.log('Строка после кодирования:')
	console.log(answer)
	console.log('Коэффициент сжатия = ', compression)
	console.log('В файле output.txt также выведен результат кодирования')
})

