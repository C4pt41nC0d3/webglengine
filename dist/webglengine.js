/*
	Environment Variables	
	
		gi: GeneralInterface instance.
		ec: EngineConsole instance.
		gee: GameEngineErrors instance.
		debug: flag for test the engine
*/
var gi, ec, gee, debug;

/*
	GameEngineConsole
*/
function EngineConsole() {
    this.reg = {};
    this.exec = function(command) {
        if (typeof command === "string"
            this.reg[command] === undefined) {
            this.reg[command]();
            return true;
        } else return false;
    };
    this.addcmd = function(command, process) {
        if (typeof command === "string" && this.reg[command] != undefined && typeof process === "function") {
            this.reg[command] = process;
            return true;
        } else return false;
    };
    this delcmd = function(command) {
        if (typeof command === "string" && this.reg[command] != undefined) {

        } else return false;
    }
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
                function F() {};
                F.prototype = parent.prototype;
                child.prototype = new F();
                child.prototype.constructor = child;
                return child;
            }
        }
    }

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
        msg: "Error message when the exception is catched.";
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
        }
    };
    /*
		Errors
		>TypeError.
	*/
    function TypeError() {};
    //Inheritance from the interface that defines the skeleton.
    TypeError = gi.Extends(ErrorInterface, TypeError);

    //Redefine the TypeError
    TypeError.prototype.name = "typerror";
    TypeError.prototype.msg = "TypeError: there is one or more vars that interrupt the program execution flow.";
    TypeError.prototype.description = "The type errors occurs when execution flow is breaked.";

    /*
	GameEngineErrors: This module register all the errors in one single structure.
*/

    function GameEngineErrors() {
        this.internalstack = {};

        this.push = function(errorobj) {
            if (typeof errorobj === "object" && errorobj.type === "Error" && this.internalstack[errorobj.name] === undefined) {
                this.internalstack[errorobj.name] = errorobj;
            } else
                console.log("The error cannot be added to GameEngineErrors structure.")
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
    }

    //init the environment vars
    ec.exec("init.envvars");
} else
    console.log("Environment variables not loaded, execution ended...");