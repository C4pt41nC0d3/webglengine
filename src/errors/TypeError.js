function TypeError(){};
//Inheritance from the interface that defines the skeleton.
TypeError = gi.Extends(ErrorInterface, TypeError);

//Redefine the TypeError
TypeError.prototype.name = "typeerror";
TypeError.prototype.msg = "TypeError: there is one or more vars that interrupt the program execution flow.";
TypeError.prototype.description = "The type errors occurs when execution flow is breaked.";