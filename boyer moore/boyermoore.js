//Казаченко Полина КНМО-101

let fs = require('fs');
var textForBoyerMoore = fs.readFileSync('Tolstoy Leo. War and Peace - royallib.com.txt').toString();
var substring = fs.readFileSync('template.txt').toString();
let lastOccurence = new Array();
let m = substring.length;
let positions = new Array();
var rpr = new Array(); //самое правое возможное перепоявление
var starstring = "";
let part = "";
let checkpart = "";
let l = 0; //длина совпавшей части
let i = 0; //индекс перового элемента в проверяемом куске текста

for (t = 0; t < m; t++){
	starstring += "*"
}
starstring += substring

for (w = 0; w < m; w++){
	lastOccurence[substring[w].charCodeAt()] = w;
}

for (u = starstring.length - 1; u >= m; u--){
	for (j = u - 1; j >= 0; j--){
		let check = 0;
		if (part.length == 0 && starstring[u] == starstring[j]){
			part = starstring[u] + part;
			rpr[part.length] = j - m;
		} else if (starstring[u] == starstring[j]){
			checkpart = starstring[u] + part
			for (z = 0; z < checkpart.length; z++){
				if (checkpart[z] == starstring[u + z]){
					check += 1
					if (check == checkpart.length && starstring[u - 1] != starstring[j - 1]){
						part = starstring[u] + part;
						rpr[part.length] = j - m; 
					}
				}
			}
		} else if (j == m){
			for (z = part.length + 1; z < m; z++)
				rpr[z] = 0;
			u = 0;
			break;
		}
	}
}

while (i <= textForBoyerMoore.length){
	if (typeof textForBoyerMoore[i + m - l - 1] == 'undefined'){
		break
	} else if (typeof lastOccurence[textForBoyerMoore[i + m - l - 1].charCodeAt()] == 'undefined'){
		i += (m - l)
		l = 0;
	} else if (textForBoyerMoore[i + m - l - 1] == substring[m - l - 1]) {
		l += 1;
		if (l == m){
			positions.push(i + m - l);
			l = 0;
			i += 1;
		}
	} else if (textForBoyerMoore[i + m - l - 1] != substring[m - l - 1]){
		if (l == 0) {
			i += (m - lastOccurence[textForBoyerMoore[i + m - l - 1].charCodeAt()] - 1)
		} else {
			i += (m - rpr[l])
			l = 0;
		}
	}
}

console.log(positions);