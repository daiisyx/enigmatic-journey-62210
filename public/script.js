// console.log is like print, gives output
// javacript works with the input of a browser

// var a = window.prompt("Tell me your name", "Name"); 
// window.alert("Hello " + a); 

// usually we get input/output based on information that is on the page 
// rarely using window.prompt and window.alert 
// for example, we may use document.getElementById() 

// .innerHTML changes the content of a object dynamically

// .querySelectorAll('[type = ""]') puts all objects of the type into an array-like container
// can access data associated with the element
// there are many ways of accessing the same data, e.g. getElementByTagName()

// for value comparison, == compares value, === compares value and type

// function definitions are at the beginning of the script
// function func1(a, b, c) {
// 	console.log(a + b + c); 
// }

// if the function is passed as a object, it will not be defined at the beginning
// var func2 = function() {
// 	console.log("hello world"); 
// }

// typeof() returns type of input data

// ---- arrays

function asc(a, b) {
	return a - b;
}

var arr =  [10, 22, 13, 54, 5, 69]; 
arr.sort(asc); // taking a comparison function as parameter
// default way of sorting is by ASCII value

// for (i = 0; i < arr.length; i++) {
// 	console.log(arr[i]);
// }

// another way to write for loop 
// for (item in arr) { 
// 	console.log(arr[item]);
// }

// every returns TRUE if the function returns TRUE for all values in the array
var x = arr.every(function(val) { 
	return val > 3; 
}); //anonymous function doesn't need definition

console.log(x);

// ---- objects
// var person = {
// 	firstname: "Bob",  
// 	lastname: "Smith", 
// 	id: 5555, 
// 	fullname: function() {
// 		return this.firstname + " " + this.lastname; 
// 	} 
// };  
// can also dynamically add items to the object through the console window 

function Person(f, l, i, a) { // class
	this.firstname = f; 
	this.lastname = l; 
	this.age = a; 
	this.id = i; 
}; // function that create a new object

// array has .push() to add items into an array
// JSON.stringify(person1); makes a string from an object
// JSON.parse(); turn a string back to object, if it is in JSON object form

// ---- web interactions
// events usually start with "on.."
// add an action to the action functions
// e.g. b.onclick = function(evt) {console.log("hello"); }

// ---- event handlers
function runcommand() {
	document.getElementsByTagName("h1")[0].innerHTML = "ADD USERS";  
}
document.getElementById("button").onclick = runcommand; 
// b.onclick = function(evt) {console.log(evt); } 
// ^ shows event settings
// document.getElementById("button").onclick = (evt)=>{console.log("hello")}; 
// it can only associate with one event handler (it will be updated or override)

// ---- event listeners
// capture: going down a hierarchy, e.g. body -> form -> button 
// bubbling: going up 
document.getElementById("button").addEventListener('click', (evt)=>{console.log("hello")});
document.getElementById("button").addEventListener('click', (evt)=>{console.log("world")});

window.addEventListener('keypress', (evt)=>{console.log(evt.keyCode)}); 
// each key has a key code