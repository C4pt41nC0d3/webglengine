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
	init: function(vector){},
	print: function(){}
}

function Vertex2D(wx,wy){
	if(typeof wx === "number" && typeof wy === "number"){
		this.x = wx;
		this.y = wy
	}
};

Extends(Vertex, Vertex2D);

Vertex2D.prototype.init = function(vertex){
	if(vertex.constructor === Array && vertex.length === 2){
		this.x = vertex[0];
		this.y = vertex[1];
	}
}

Vertex2D.prototype.print = function(){
	return "("+this.x+", "+this.y+")";
}

var v1 = new Vertex2D(0,1);
var v2 = new Vertex2D(0,2);
console.log(v1.print());
console.log(v2.print());
console.log(v1.constructor);
console.log("Test Aproved");
