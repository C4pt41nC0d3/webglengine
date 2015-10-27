function Extends(parent, child){
	if(typeof parent === "function" && typeof child === "function"){
		var F = function(){};
		F.prototype = parent.prototype;
		child.prototype = new F();
		child.prototype.constructor = child;
		child.uber = parent.prototype;
	}
}

function Extends2(parent, child){
	if(typeof parent === "function" && typeof child === "function"){
		var F = function(){};
		F.prototype = parent.prototype;
		var o = new F();

		for(var op in o)
			child.prototype[op] = o[op];


		child.prototype.constructor = child;
		child.uber = parent.prototype; 
	}
}

function Vertex(){};
Vertex.prototype = {
	vector: {},
	init: function(vector){},
	print: function(){}
};


function Vertex2D(){};
Extends(Vertex, Vertex2D);

Vertex2D.prototype.vector = {
	x: 0,
	y: 0
};

Vertex2D.prototype.init = function(vector){
	if(vector.constructor === Array && vector.length === 2){
		this.vector.x = vector[0];
		this.vector.y = vector[1];
	}
};

Vertex2D.prototype.print = function(){
	return "("+this.vector.x+", "+this.vector.y+")";
}

var v1 = new Vertex2D(), v2 = new Vertex2D();
v1.init([0,1]); v2.init([0,2]);
console.log("Expected (0,1): "+v1.print());
console.log("Expected (0,2): "+v2.print());
