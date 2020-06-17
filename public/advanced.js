// JS variable scope 
// global - no prefix
// function - var (only defined in the function, can't be called outside the function)
// block - let (is not remembered after a loop, if defined in a loop)

/*
function myfunc() {
	v = "myfunc_var"; // global variable
	let le = "myfunc_let";
	console.log(v); 
	console.log(le);
	for (let i = 0; i < 10; i++) {
		console.log(i); 
	} 
	// console.log(i);
} */

var cb1 = ()=>{console.log("cb1"); }
var cb2 = ()=>{console.log("cb2"); }
// functions will be put in a call stack
// the functions that are set aside will be put onto the stack when the waiting time is over
console.log("start");
setTimeout(cb1, 1000); // meaning wait for 1s before executing the function
setTimeout(cb2, 500);  // the time can be used by other programs 
// setTimeout() is executed and passed the parameter to api to keep track when it's time to execute the inside function
console.log("end"); 