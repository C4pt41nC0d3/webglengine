/*
	ErrorInterface: Define the implementation for all the Errors.
*/
function ErrorInterface(){}
 
ErrorInterface.prototype = {
	type: "Error",
	name: "Error name",
	count: 0, // count how many times the error ocurs
	description: "Error description",
	msg: "Error message when the exception is catched.";
	print: function(){
		console.log("Error name\nDescription:");
		console.log(this.description);
		console.log("\nOcurrence: "+this.count);
	},
	//increase the error counter
	inc: function(){
		this.count++;
	},
	message: function(){
		console.log(this.msg);
		this.inc();
	}
};