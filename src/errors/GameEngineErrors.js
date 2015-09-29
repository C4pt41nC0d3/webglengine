function GameEngineErrors(){
	this.internalstack = {};
	this.push = function(errorobj){
		if(typeof errorobj === "object"
			&& errorobj.type === "Error"
			&& this.internalstack[errorobj.name] === undefined){
			this.internalstack[errorobj.name] = errorobj;
		}
		else
			console.log("The error cannot be added to GameEngineErrors structure.")
	};
	this.popByName = function(name){
		if(typeof name === "string"
			&& this.internalstack[name] != undefined){
				var tmp = this.internalstack[name];
				
				if(delete this.internalstack[name])
					return tmp;
				else 
					console.log("The error cannot be poped");
		}
		else 	
			console.log("The error doesn't exists, try each other.");
	};
	this.print = function(){
		if(!gi.objectIsEmpty(this.internalstack))
			for(var errorname in this.internalstack)
				this.internalstack[errorname].print();
		else 
			console.log("There is not errors in this structure");
	};
}
