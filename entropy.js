s = 'good';
alph = new Array();
for(i = 0; i < s.length; i++){
    if (s.charAt(i) in alph)
        alph[s.charAt(i)]++;
    else
        alph[s.charAt(i)] = 1;
}
n = 0;
for(i in alph){
    alph[i] /= s.length;
    n ++;
}
h = 0;
for(i in alph){
    h -= alph[i] * Math.log(alph[i]);
}
if (Math.log(n) == 0)
	h = 0;
else
	h /= Math.log(n);
console.log(h)