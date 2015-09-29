function GeneralInterface(){}

GeneralInterface.prototype = {
	objectIsEmpty: function(o){
		for(var p in o)
			return false;
		return true;
	},
	//extends and factorize the child
	Extends: function(parent, child){
		if(typeof parent === "function"
			&& typeof child === "function"){

			//function for break the chain
			function F(){}; 
			F.prototype = parent.prototype;
			child.prototype = new F();
			child.prototype.constructor = child;
			return child;
		}
	}
}