function IteratorImplInterface(){}
IteratorImplInterface.prototype = {
	iterator: undefined, //empty iterator
	set: function(iterator){
		if(typeof iterator === "object"
			&& iterator.type = "iterator"){
			this.iterator = iterator;
		}
		else console.log("The iterator doesn't exist");
	}
}