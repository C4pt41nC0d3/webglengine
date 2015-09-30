function IteratorInterface(){}
IteratorInterface.prototype = {
	innerobject: undefined,
	prev: function(){}, //previus function
	next: function(){}, //next function
	init: function(){
		//implementation of iterator
	}
}
