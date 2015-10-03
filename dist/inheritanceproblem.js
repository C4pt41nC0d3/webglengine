function Extends(parent, child){
	var F = function(){};
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;
	child.uber = parent.prototype;
}

function parent(){}
parent.prototype.value = 2;
parent.prototype.changeValue = function(){};

function child0(){}
Extends(parent, child0);
child0.prototype.value = 1;
child0.prototype.changeValue = function(w){
	this.value = w;
}

function child1(){}
Extends(parent, child1);
child1.prototype.changeValue = function(w){
	w++;
	this.value = w;
}

/*
	El problema se presenta cuando tienen dos constructores que se extienden de un mismo constructor
	padre, por lo tanto si se modifican los valores deja lo mismo para todos.
*/

var oc0 = new child0(), oc1 = new child1();
oc0.changeValue(3);
console.log("Valor de la propiedad value en el objeto oc0: "+oc0.value); //se espera un tres
console.log("Valor de la propiedad value en el objeto oc1: "+oc1.value); //se espera un dos
//también presenta un error al referenciar al prototipo del constructor child1
console.log("Valor de la propiedad valie en el prototipo del constructor child1: "+child1.prototype.value); //valor esperado 2