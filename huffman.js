let string = 'q';
console.log(string)
let alph = new Array();
let tree = new Array();

//КАЗАЧЕНКО ПОЛИНА КНМО-101

function Node(letter, freq, used, father, code){
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.father = father;
	this.code = code;
};

for (i = 0; i < string.length; i++){
	alph[string.charAt(i)] = 0;
};
for (i = 0; i < string.length; i++){
	alph[string.charAt(i)]++;
};
for (i in alph){
	let newNode = new Node(i, alph[i], 0, null, '');
	tree.push(newNode);
}
tree_length = tree.length

for(i = 0; i < tree_length - 1; i++){
	minNumber = -1;
	predMinNumber = -1;
	minFreq = string.length;
	predMinFreq = string.length;
	for(j = 0; j < tree.length; j++){
		if((tree[j].used == 0) && (tree[j].freq <= minFreq)){
			predMinNumber = minNumber;
			predMinFreq = minFreq;
			minNumber = j;
			minFreq = tree[j].freq;
		} else if ((tree[j].used == 0) && (tree[j].freq <= predMinFreq)){
			predMinNumber = j;
			predMinFreq = tree[j].freq;
		}
	}
	tree[predMinNumber].used = 1;
	tree[minNumber].used = 1;
	tree[predMinNumber].father = tree.length;
	tree[minNumber].father = tree.length;
	tree[minNumber].code = '0';
	tree[predMinNumber].code = '1';
	let newNode = new Node(tree[predMinNumber].letter + tree[minNumber].letter, tree[predMinNumber].freq + tree[minNumber].freq, 0, null, '');
	tree.push(newNode);
}

console.log(tree)
if (string.length == 1){
	tree[0].code = '0'
}

let bigNumber = 0
for (i = 0; i < tree.length; i++){
	if (tree[i].father > bigNumber){
		bigNumber = tree[i].father;
	}
}
for (i = bigNumber - 1; i >= 0; i--){
	tree[i].code = tree[tree[i].father].code + tree[i].code;
}
for (j = 0; j < tree_length; j++){
	console.log(tree[j].letter + ' ' + tree[j].code);
}

let codedMessage = '';
for (i = 0; i < string.length; i++){
	for (j = 0; j < tree.length; j++){
		if (string[i] == tree[j].letter){
			codedMessage += tree[j].code;
		}
	}
}
console.log('Закодированное сообщение ' + codedMessage);

let decodedMessage = '';
let str = '';
for (i = 0; i < codedMessage.length; i++){
	str += codedMessage[i]
	for (j = 0; j < tree_length; j++){
		if (str == tree[j].code){
			decodedMessage += tree[j].letter
			str = ''
		}
	}
}
console.log('Раскодированное сообщение ' + decodedMessage)