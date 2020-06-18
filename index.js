const express = require('express')
const path = require('path') /*pre-installed library*/
const PORT = process.env.PORT || 5000
// either production environment or local 5000

const { Pool } = require('pg'); 
var pool; 
pool = new Pool ({ // a constructor pool 
	connectionString: 'postgres://postgres:root@localhost/users' //scheme://user:password@localhost/database
	// connectionString: process.env.DATABASE_URL; 
});

var app = express(); // building a app
app.use(express.json()); // to make it work with json
app.use(express.urlencoded({extended:false})); // making server understand url
app.use(express.static(path.join(__dirname, 'public'))); 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); //the .ejs files add more functionalities to the server

// get is when user sends a request, it will be a link 
// the response to the request is set to be .render('pages/index')
app.get('/', (req, res) => res.render('pages/index'));
// what to do if request is database 
app.get('/database', (req, res) => { // whenever user types into the app
	var getUserQuery = 'SELECT * FROM usr'; 
	pool.query(getUserQuery, (error, result)=>{
		if (error)
			res.end(error); // send error object if there is error
		var results = {'rows': result.rows}; // array of rows
		res.render('pages/db', results);
	})
}); 

// from the post method of the user, and will do the corresponding actions
app.post('/adduser', (req, res) => {
	console.log("post request for /adduser"); 
	var uname = req.body.uname; // from the web app, .uname is the name of a tag
	var age = req.body.age; 
	res.send(`username: ${uname}, age: ${age}`);	
}); 

app.get(`/users/:id`, (req, res) => {
	var uid = req.params.id; 
	console.log(req.params.id);
	// search the database using the uid 
	res.send("got it!");
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 

/* This is code used to run the server of the application. 
   Any static request will search through the public folder, 
   if request file is not found, then the server will run 
   through the definitions to satisfy the request. */

//nodemon auto updates the server file, so we don't have to restart every time