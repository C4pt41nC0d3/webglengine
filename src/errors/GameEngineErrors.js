function GameEngineErrors() {
    this.internalstack = {};
    this.push = function(errorobj) {
        if (typeof errorobj === "object" 
            && errorobj.type === "Error" 
            && this.internalstack[errorobj.name] === undefined) {
            this.internalstack[errorobj.name] = errorobj;
        	return true;
        } else{
            console.log("The error cannot be added to GameEngineErrors structure.")
        	return false:
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
            console.log("The error doesn't exist.");
    };
}

ec.addcmd(
    "register.errors",
    function(){
        //push the errors
    	//this expression returns true if the errors are added
        //return gee.push(new error0()) & gee.push(new error1())
       	return gee.push(new TypeError())
            & gee.push(new VertexError());
    }
);

if(ec.exec("register.errors"))
    console.log("Registering the EngineErrors datatype");
else
    console.log("The errors wasn't registered.");


/*
Example of one type error
try {
    var number;

    number = "hello";

    if (typeof number != "number")
        throw gee.get("typeerror");
    else
        console.log("The variable is a number");
} catch (error) {
    error.message();
}*/