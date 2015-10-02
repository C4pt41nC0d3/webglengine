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
			child.constructor = child;
			return child;
		}
	},
	mapObjectToArray: function(io){
		if(typeof io === "object"){
			var tmp = [];

			for(var p in io)
				tmp.push(io[p]);

			return tmp;
		}
	},
	mapArrayToObject: function(array, defobject){
		if(array.constructor == Array
			&& typeof defobject == "object"){
			var index = -1;

			try{
				for(var p in defobject)
					defobject[p] = array[index++];
				return defobject;
			}
			catch(error){
				console.log(error);	
			}
		}
	}
};