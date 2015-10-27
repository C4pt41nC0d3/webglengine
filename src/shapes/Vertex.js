function Vertex() {}
Vertex.prototype = {
    vector: {},
    type: "vertex",
    distance: function(vertex) {},
    init: function(vector) {},
    toArray: function() {
        return gi.mapObjectToArray(this.vector);
    },
    convertArrayToObject: function(array) {
        if (array.constructor == Array && (array.length == 2 || array.length == 3))
            this.vector = gi.mapArrayToObject(array, this.vector)
    }
}

function Vertex2D() {}
gi.Extends(Vertex, Vertex2D);

/*
	@{Inherited}
*/
Vertex2D.prototype.vector = {
    x: 0,
    y: 0
};

/*
	@{Inherited}
*/
Vertex2D.type = "vertex2d";

/*
	@{Inherited}
*/
Vertex2D.prototype.distance = function(vertex) {
    try {
        if (vertex.type == "vertex" && vertex.x != undefined && vertex.y != undefined)
            return Math.sqrt(
                Math.pow(this.vector.x - vextex.x, 2) +
                Math.pow(this.vector.y - vertex.y, 2)
            );
        else
            throw gee.get("vertexerror");
    } catch (error) {
        error.message();
    }
}

/*
	@{Inherited}
*/
Vertex2D.prototype.init = function(vector) {
    if (vector.constructor == Array && vector.length == 2) {
        this.vector.x = vector[0];
        this.vector.y = vector[1];
    } else
        console.log("Vertex2DError: You need pass one vector");
}

function Vertex3D() {}
gi.Extends(Vertex, Vertex3D);

/*
	@{Inherited}
*/
Vertex3D.type = "vertex3d";

/*
	@{Inehrited}
*/
Vertex3D.prototype.vector = {
    x: 0,
    y: 0,
    x: 0
};

/*
	@{Inherited}
*/
Vertex3D.prototype.distance = function(vertex) {
    try {
        if (vertex.type == "vertex" && vertex.x != undefined && vertex.y != undefined && vertex.z != undefined)
            return Math.sqrt(
                Math.pow(this.vector.x - vertex.x, 2) +
                Math.pow(this.vector.y - vertex.y, 2) +
                Math.pow(this.vector.z - vertex.z, 2)
            );
        else
            throw gee.get("vertexerror");
    } catch (error) {
        error.message();
    }
}

/*
	@{Inherited}	
*/
Vertex3D.prototype.init = function(vector) {
    if (vector.constructor == Array & vector.length == 3) {
        this.vector.x = vector[0];
        this.vector.y = vector[1];
        this.vector.z = vector[2];
    } else
        console.log("Vertex3DError: you need pass one 3d vector array");
}

//testing the vertex
var v1 = new Vertex2D(),
    v2 = new Vertex2D();
v1.init([0, 0]);
v2.init([1, 1]);
v1.print();
v2.print();

/* new version */
function Vertex(){};

Vertex.prototype = {
    name: "",
    toString: function(){
        return this.name;
    }
    init: function(wx, wy){},
    distance: function(vertex){},
    toArray: function(){},
    mapArray: function(vector){}
}

function Vertex2D(wx, wy){
    if(this.wx === "number" && twy === "number"){
        this.x = wx;
        this.y = wy;
    }
} 

gi.Extends(Vertex, Vertex2D);
Vertex2D.prototype.name = "vertex2d";
Vertex2D.prototype.init = function(wx, wy){
    if(typeof wx === "number" && typeof wy === "number"){
        this.x = wx;  
        this.y = wy;
    }
}
