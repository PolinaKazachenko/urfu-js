s = 'шалашалашкрыша шала ш';
t = 'шалаш';
m = t.length;
alph = new Array();
for (i = 0; i < m; i++)
	alph[t.charAt(i)] = 0;
del = new Array(m + 1);
for (j = 0; j <= m; j++)
	del[j] = new Array();
for (i in alph)
	del[0][i] = 0;
for (j = 0; j < m; j++) {
	prev = del[j][t.charAt(j)]
	del[j][t.charAt(j)] = j + 1
	for (i in alph)
		del[j+1][i] = del[prev][i]
}

state = 0;
positions = new Array();
for (i = 0; i < s.length; i++){
		if (s.charAt(i) in alph)
			state = del[state][s.charAt(i)]
		else
			state = 0;
		if (state == m)
			positions.push(i - m + 1);
}
if (positions.length == 0)
	console.log('Совпадений нет');
else
	console.log(positions)