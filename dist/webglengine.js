/*
	Environment Variables	
	
	gi: GeneralInterface instance.
	ec: EngineConsole instance.
	gee: GameEngineErrors instance.
	debug: flag for test the engine.
*/
var gi, ec, gee, debug, radtodeg = (180/Math.PI), degtorad = (Math.PI/180);

/*
    GameEngineConsole
*/
function EngineConsole() {
    /*
       @{Parameter}
    */
    this.reg = {};
    
    /*
        @{Method}
        command: receives one string that represents the command to execute.
    */
    this.exec = function(command) {
        if (typeof command === "string" && this.reg[command] != undefined) {
            this.reg[command]();
            return true;
        } else return false;
    };
    /*
        @{Method}
        command: receives the name of the command,
        process: is a functiona that is saved with the name of the command.
    */
    this.addcmd = function(command, process) {
        if (typeof command === "string" && this.reg[command] === undefined && typeof process === "function") {
            this.reg[command] = process;
            return true;
        } else return false;
    };
    /*
        @{Method}
        command: the string that represents the name of the command.
    */
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
        debug = true; //if debug enabled then print all the messages
    }
)) {
    console.log("Environment variables loaded...");

    function GeneralInterface() {}

    GeneralInterface.prototype = {
        /*
           @{Method}
           Verify if one object is empty
           o: the object to verify.
        */
        objectIsEmpty: function(o) {
            for (var p in o)
                return false;
            return true;
        },
        /*
            @{Method}
            Extends a child constructor to its parent
            parent: the parent constructor
            child: the child constructor
        */
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
        /*
           @{Method}
           Extends a child constructor to its parent, and copy the prototype object to the child.
           parent: the parent constructor.
           child: the child constructor.
        */
        extendsWithCopy: function(parent, child){
            if(typeof parent === "function" && typeof child === "function"){
                var F = function(){};
                F.prototype = parent.prototype;
                var tmpobject = new F();

                for(var pp in tmpobject)
                    child.prototype[pp] = tmpobject[pp];

                child.prototype.constructor = child;
                child.uber = parent.prototype;
            }
        },
        /*
           @{Method}
           Map one object and returns an array.
           io: the input object
        */
        mapObjectToArray: function(io) {
            if (typeof io === "object") {
                var tmp = [];

                if(!tmp.push){
                   var i = -1;
                   for(var p in io)
                       tmp[i++] = io[p];
                }
                else 
                    for(var p in io)
                       tmp.push(io[p]);

                return tmp;
            }
        }
    };
  
    /*
        ErrorInterface: Define the implementation for all the Errors.
    */
    function ErrorInterface() {};
    
    ErrorInterface.prototype = {
        type: "Error",
        name: "Error name",
        count: 0, // count how many times the error ocurs
        description: "Error description",
        msg: "Error message when the exception is catched.",
        /*
           @{Method}
           Print the information about the error.
        */
        print: function() {
            console.log("Error name: "+this.name+"\nDescription:");
            console.log(this.description);
            console.log("\nOcurrence: " + this.count);
        },
        /*
           @{Method}
           Increase the counter of the ocurrences of error
        */
        inc: function() {
            this.count++;
        },
        /*
           @{Method}
           Print the message of the error and increase the counter.
        */
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

        /*
           @{Method}
           Add one error object to the GameEngineErrors stack.
           errorobj: is one instance of the error that implements the error interface.
        */
        this.push = function(errorobj) {
            if (typeof errorobj === "object"
                && errorobj.type === "Error" 
                && this.internalstack[errorobj.name] === undefined) {
                this.internalstack[errorobj.name] = errorobj;
                return true;
            } else {
                console.log("The error cannot be added to GameEngineErrors structure.");
                return false;
            }
        };
        
        /*
           @{Method}
           Destroy one object of the internal stack and returns the internal error object.
           name: is the name of the error.
        */
        this.popByName = function(name) {
            if (typeof name === "string" 
                && this.internalstack[name] != undefined) {
                var tmp = this.internalstack[name];
                
                if (delete this.internalstack[name])
                    return tmp;
                else
                    console.log("The error cannot be poped");
            } else
                console.log("The error doesn't exists, try each other.");
        };
          
        /*
           @{Method}
           Print the information of all errors that contains internal stack.
        */
        this.print = function() {
            if (!gi.objectIsEmpty(this.internalstack))
                for (var errorname in this.internalstack)
                    this.internalstack[errorname].print();
            else
                console.log("There is not errors in this structure");
        };
          
        /*
           @{Method}
           Returns the object by the name.
           name: is the name of the object in internal stack.
        */
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
        1) TypeError: the engine throws a TypeError when a parameter is bad passed.
        2) VertexErro: the errors of the that implements the vertex interface.
    */
    function TypeError() {};
    //Inheritance from the interface that defines the skeleton.
    gi.Extends(ErrorInterface, TypeError);

    //Redefine the TypeError
    TypeError.prototype.name = "typeerror";
    TypeError.prototype.msg = "TypeError: there is one or more vars that interrupt the program execution flow.";
    TypeError.prototype.description = "The type errors occurs when execution flow is breaked.";

    function VertexError() {};

    gi.Extends(ErrorInterface, VertexError);
    VertexError.prototype.name = "vertexerror";
    VertexError.prototype.msg = "VertexError: The parameters are wrong.";
    VertexError.prototype.description = "The Vertex Error ocurs when a value is wrong in its parameters.";

    //registering the errors
    ec.addcmd(
        "register.errors",
        function() {
            //push the errors
            //this expression returns true if the errors are added
            //return gee.push(new error0()) & gee.push(new error1())
            return gee.push(
                new TypeError()) 
               & gee.push(new VertexError()
            );
        }
    );

    if (ec.exec("register.errors"))
        console.log("EngineErrors datatype was registered");
    else
        console.log("The errors wasn't registered.");

    
    function Vertex(){};
    
    Vertex.prototype = {
        init: function(array){},
        distance: function(vertex){},
        toArray: function(){},
        toObject: function(){},
        toString: function(){}
    };
    
    function Vertex2D(x, y){
        try{
           if(typeof x == "number" && typeof y == "number"){
               this.x = x; this.y = y;
           }
           else throw gee.get("vertexerror");
        }
        catch(erno){
            erno.message();
        }
    };
    
    gi.Extends(Vertex, Vertex2D);
    Vertex2D.prototype.init = function(array){
       if(array.constructor === Array
         && array.length === 2){
           this.x = array[0];
           this.y = array[1];
       }
       else console.log("This vertex2d wasn't change");
    };
    
    Vertex2D.prototype.distance = function(vertex){
        if(vertex.constructor === Vertex2D){
              var t1 = Math.pow(this.x-vertex.x, 2);
              var t2 = Math.pow(this.y-vertex.y, 2);
              var t3 = Math.sqrt(t1+t2);
              return t3;
        }
        else console.log("The vertex object passed not is an vertex object");
    };
    
    Vertex2D.prototype.toArray = function(){
        return [this.x, this.y];
    };
    
    Vertex2D.prototype.toObject = function(){
        return {
            x: this.x,
            y: this.y
        };
    };
    
    Vertex2D.prototype.toString = function(){
        return "("+this.x+", "+this.y+")";
    };
    
    Vertex2D.prototype.dotproduct = function(vertex){
        if(vertex.constructor === Vertex2D){
            return ((this.x*vertex.x)+(this.y*vertex.y));
        }
    };
    
    Vertex2D.prototype.norm = function(){
        var t1 = Math.pow(this.x, 2);
        var t2 = Math.pow(this.y, 2);
        var t3 = Math.sqrt(t1+t2);
        return t3;
    };
   
    Vertex2D.prototype.angle = function(vertex){
        if(vertex.constructor === Vertex2D){
            var t1 = this.dotproduct(vertex);
            var t2 = this.norm();
            var t3 = vertex.norm();
            var t4 = (t1/(t2*t3));
            var t5 = Math.acos(t4);
            return t5;
        }
    }
    
    //testing vertex2d module
    var v1 = new Vertex2D(0,1);
    var v2 = new Vertex2D(1,0);
    console.log(v1.norm());
    console.log(v2.norm());
    console.log(v1.dotproduct(v2));
    console.log(v1.angle(v2)*radtodeg);
   
    function Vertex3D(x, y, z){
        try{
           if(typeof x === "number"
             && typeof y === "number"
             && typeof z === "number"){
               this.x = x;
               this.y = y;
               this.z = z; 
           }
           else throw gee.get("vertexerror");
        }
        catch(erno){
            erno.message(); 
        }
    }
    
   gi.Extends(Vertex, Vertex3D);
    
   Vertex3D.prototype.init = function(array){
       if(array.constructor === Array && array.length === 3){
           this.x = x;
           this.y = y;
           this.z = z;
       }
       else console.log("The array passed is not an array and haven't a length of three");
   };
    
   Vertex3D.prototype.distance = function(vertex){
       if(vertex.constructor === Vertex3D){
            var t1 = Math.pow(this.x - vertex.x, 2);
            var t2 = Math.pow(this.y - vertex.y, 2);
            var t3 = Math.pow(this.z - vertex.z, 2);
            var t4 = Math.sqrt(t1+t2+t3);
            return t4;
       }
   };
   
   Vertex3D.prototype.toArray = function(){
       return [this.x, this.y, this.z];
   };
   
   Vertex3D.prototype.toObject = function(){
       return {
           x: this.x,
           y: this.y,
           z: this.z
       }; 
   };
   
   Vertex3D.prototype.toString = function(){
       return "("+this.x+", "+this.y+", "+this.z+")"; 
   };
   
   //return one array that represents the cross vector
   Vertex3D.prototype.crossproduct = function(vertex){
       if(vertex.constructor === Vertex3D){
         var t1 = ((this.y*vertex.z)-(this.z*vertex.y))
         var t2 = ((this.x*vertex.z)-(this.z*vertex.x))*(-1);
         var t3 = ((this.x*vertex.y)-(this.y*vertex.x));
         return [
             t1,
             t2,
             t3
         ];
       }
   };
   
   Vertex3D.prototype.dotproduct = function(vertex){
       if(vertex.constructor === Vertex3D){
           return ((this.x*vertex.x)+(this.y*vertex.y)+(this.z*vertex.z));
       }
   };
    
   Vertex3D.prototype.norm = function(){
      var t1 = Math.pow(this.x, 2);
      var t2 = Math.pow(this.y, 2);
      var t3 = Math.pow(this.z, 2);
      var t4 = Math.sqrt(t1+t2+t3);
      return t4;
   };
   
   Vertex3D.prototype.angle = function(vertex){
       if(vertex.constructor === Vertex3D){
          var t1 = this.dotproduct(vertex);
          var t2 = this.norm();
          var t3 = vertex.norm();
          var t4 = (t1/(t2*t3));
          var t5 = Math.acos(t4);
          return t5;
       }
   };
   Vertex
} else console.log("Environment variables not loaded, execution ended...");