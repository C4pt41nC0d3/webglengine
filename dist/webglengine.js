/*
	Environment Variables	
	
		gi: GeneralInterface instance.
		ec: EngineConsole instance.
		gee: GameEngineErrors instance.
		debug: flag for test the engine

        Note: make a correction in extends function.
*/
var gi, ec, gee, debug;

/*
    GameEngineConsole
*/
function EngineConsole() {
    this.reg = {};
    this.exec = function(command) {
        if (typeof command === "string" && this.reg[command] != undefined) {
            this.reg[command]();
            return true;
        } else return false;
    };
    this.addcmd = function(command, process) {
        if (typeof command === "string" && this.reg[command] === undefined && typeof process === "function") {
            this.reg[command] = process;
            return true;
        } else return false;
    };
    this.delcmd = function(command) {
        if (typeof command === "string" && this.reg[command] != undefined) {
            return delete this.reg[command];
        } else return false;
    };
}

ec = new EngineConsole();
if (ec.addcmd(
    "init.envvars",
    function() {
        gi = new GeneralInterface();
        gee = new GameEngineErrors();
        debug = true;
    }
)) {
    console.log("Environment variables loaded...");

    function GeneralInterface() {}

    GeneralInterface.prototype = {
        objectIsEmpty: function(o) {
            for (var p in o)
                return false;
            return true;
        },
        //extends and factorize the child
        Extends: function(parent, child) {
            if (typeof parent === "function" && typeof child === "function") {
                //function for break the chain
                var F = function(){};
                F.prototype = parent.prototype;
                child.prototype = new F();
                child.prototype.constructor = child;
                child.uber = parent.prototype;
            }
        },
        mapObjectToArray: function(io) {
            if (typeof io === "object") {
                var tmp = [];

                for (var p in io)
                    tmp.push(io[p]);

                return tmp;
            }
        }
    };
    //all code goes here
    /*
        ErrorInterface: Define the implementation for all the Errors.
    */
    function ErrorInterface() {}

    ErrorInterface.prototype = {
        type: "Error",
        name: "Error name",
        count: 0, // count how many times the error ocurs
        description: "Error description",
        msg: "Error message when the exception is catched.",
        print: function() {
            console.log("Error name\nDescription:");
            console.log(this.description);
            console.log("\nOcurrence: " + this.count);
        },
        //increase the error counter
        inc: function() {
            this.count++;
        },
        message: function() {
            console.log(this.msg);
            this.inc();

            //print the error information if the debug mode is enabled [debug=true]
            if (debug)
                this.print();
        }
    };
    /*
    GameEngineErrors: This module register all the errors in one single structure.
*/

    function GameEngineErrors() {
        this.internalstack = {};

        this.push = function(errorobj) {
            if (typeof errorobj === "object" && errorobj.type === "Error" && this.internalstack[errorobj.name] === undefined) {
                this.internalstack[errorobj.name] = errorobj;
                return true;
            } else {
                console.log("The error cannot be added to GameEngineErrors structure.");
                return false;
            }
        };

        this.popByName = function(name) {
            if (typeof name === "string" && this.internalstack[name] != undefined) {
                var tmp = this.internalstack[name];

                if (delete this.internalstack[name])
                    return tmp;
                else
                    console.log("The error cannot be poped");
            } else
                console.log("The error doesn't exists, try each other.");
        };

        this.print = function() {
            if (!gi.objectIsEmpty(this.internalstack))
                for (var errorname in this.internalstack)
                    this.internalstack[errorname].print();
            else
                console.log("There is not errors in this structure");
        };

        this.get = function(name) {
            if (typeof name === "string" && this.internalstack[name] != undefined) {
                return this.internalstack[name];
            } else
                console.log("The error doesn't exist.")
        };
    }

    //init the environment vars
    ec.exec("init.envvars");

    /*
        Errors
        >TypeError.
    */
    function TypeError() {};
    //Inheritance from the interface that defines the skeleton.
    gi.Extends(ErrorInterface, TypeError);

    //Redefine the TypeError
    TypeError.prototype.name = "typeerror";
    TypeError.prototype.msg = "TypeError: there is one or more vars that interrupt the program execution flow.";
    TypeError.prototype.description = "The type errors occurs when execution flow is breaked.";

    function VertexError() {}

    gi.Extends(ErrorInterface, VertexError);
    VertexError.prototype.name = "vertexerror";
    VertexError.prototype.msg = "VertexError: The parameters or the distance are wrong in the current vertex.";
    VertexError.prototype.description = "The VertexError occurs where the method distance is undefined or the internal parameters are wrong";

    //registering the errors
    ec.addcmd(
        "register.errors",
        function() {
            //push the errors
            //this expression returns true if the errors are added
            //return gee.push(new error0()) & gee.push(new error1())
            return gee.push(new TypeError()) & gee.push(new VertexError());
        }
    );

    if (ec.exec("register.errors"))
        console.log("EngineErrors datatype was registered");
    else
        console.log("The errors wasn't registered.");

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
        },
        print: function() {}
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
    Vertex2D.prototype.type = "vertex2d";

    /*
    @{Inherited}
*/
    Vertex2D.prototype.distance = function(vertex) {
        try {
            if (vertex.type == "vertex2d" && vertex.vector.x != undefined && vertex.vector.y != undefined) {
                console.log("enter");
                /*return Math.sqrt(
                    Math.pow(this.vector.x - vextex.vector.x, 2) +
                    Math.pow(this.vector.y - vertex.vector.y, 2)
                );*/
                console.log(this.vector);
                console.log(vertex.vector);
            } else
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

    /*
       @{Inherited}
    */
    Vertex2D.prototype.print = function() {
        return "(" + this.vector.x + ", " + this.vector.y + ")";
    }

    function Vertex3D() {}
    gi.Extends(Vertex, Vertex3D);

    /*
    @{Inherited}
*/
    Vertex3D.prototype.type = "vertex3d";

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
            if (vertex.type == "vertex3d" && vertex.vector.x != undefined && vertex.vector.y != undefined && vertex.vector.z != undefined)
                return Math.sqrt(
                    Math.pow(this.vector.x - vertex.vector.x, 2) +
                    Math.pow(this.vector.y - vertex.vector.y, 2) +
                    Math.pow(this.vector.z - vertex.vector.z, 2)
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

    /*
       @{Inherited}
    */
    Vertex3D.prototype.print = function() {
        return "(" + this.vector.x + ", " + this.vector.y + ", " + this.vector.z + ")";
    }

    //testing the vertex
    var v1 = new Vertex2D(), v2 = new Vertex2D();
    v1.init([0,0]); v2.init([1,1]);
    v1.print(); v2.print();
} else console.log("Environment variables not loaded, execution ended...");