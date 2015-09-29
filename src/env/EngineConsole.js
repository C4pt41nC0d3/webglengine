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
function EngineConsole(){
	this.reg = {};
	this.exec = function(command){
		if(typeof command === "string"
			&& this.reg[command] === undefined){
			this.reg[command]();
		  return true;
		}
	   	else return false;
	};
	this.addcmd = function(command, process){
		if(typeof command === "string"
			&& this.reg[command] != undefined
			&& typeof process === "function"){
			this.reg[command] = process;
		   return true;
		}
	    else return false;
	};
	this delcmd = function(command){
		if(typeof command === "string"
			&& this.reg[command] != undefined){

		}
	   else return false;
	}
}

ec = new EngineConsole();
if(ec.addcmd(
	"init.envvars",
	function(){
		gi = new GeneralInterface();
		gee = new GameEngineErrors();
		debug = true;
	}
)){
	console.log("Environment variables loaded.");

	//all code goes here
	
}
else 
	console.log("Environment variables not loaded.");