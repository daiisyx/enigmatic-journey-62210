const express = require('express')
const path = require('path') /*pre-installed library*/
const PORT = process.env.PORT || 5000
// either production environment or local 5000

const { Pool } = require('pg'); 
var pool; 
pool = new Pool ({ // a constructor pool 
	connectionString: 'postgres://postgres:root@localhost/persons' //scheme://user:password@localhost/database
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

size = []; 
height = []; 
type = []; 
name = [];
id = []; 

// what to do if request is database 
app.get('/people', (req, res) => { // whenever user types into the app
	var viewPersonQuery = 'SELECT name FROM person ORDER BY name'; 
	var selectSizeQuery = 'SELECT size FROM person'; 
	var selectHeightQuery = 'SELECT height FROM person'; 
	var selectTypeQuery = 'SELECT type FROM person'; 
	var selectIdQuery = 'SELECT id FROM person'; 

	// Name List Display
	pool.query(viewPersonQuery, (error, result)=>{
		if (error)
			res.end(error); // send error object if there is error
		for (let i = 0; i < (result.rows).length; i++) {
			name.push(result.rows[i]); 
		}
	    pool.query(selectSizeQuery, (error, result)=>{
			if (error)
				res.end(error); // send error object if there is error
			for (let i = 0; i < (result.rows).length; i++) {
				size.push(result.rows[i]); 
			}
		})
		pool.query(selectHeightQuery, (error, result)=>{
			if (error)
				res.end(error); // send error object if there is error
			for (let i = 0; i < (result.rows).length; i++) {
				height.push(result.rows[i]); 
			}
		})
		pool.query(selectTypeQuery, (error, result)=>{
			if (error)
				res.end(error); // send error object if there is error
			for (let i = 0; i < (result.rows).length; i++) {
				type.push(result.rows[i]); 
			}
		})
		pool.query(selectIdQuery, (error, result)=>{
			if (error)
				res.end(error); // send error object if there is error
			for (let i = 0; i < (result.rows).length; i++) {
				id.push(result.rows[i]); 
			}
		})
		var temp1 = name.concat(size); 
		var temp2 = temp1.concat(height);
		var temp3 = temp2.concat(type); 
		var data = temp3.concat(id); 
		res.render('pages/db', data);
		// res.send(data);
		size = []; 
		height = []; 
		type = []; 	
		name = [];
		id = [];
	})
});

// from the post method of the user, and will do the corresponding actions
// app.post('/adduser', (req, res) => {
// 	console.log("post request for /adduser"); 
// 	var uname = req.body.uname; // from the web app, .uname is the name of a tag
// 	var age = req.body.age; 
// 	res.send(`username: ${uname}, age: ${age}`);	
// }); 

// add user
app.post('/addUser', (req, res) => {
	var name = req.body.a_name;
	var size = req.body.a_size;
	var height = req.body.a_height;
	var type = req.body.a_type; 
	var id = req.body.a_id; 
	var query = 'INSERT INTO person VALUES '; 
	var addUserQuery = query.concat('(\'', name, '\', ' , size, ', ' , height, ', \'', type, '\', \'', id, '\')');
	pool.query(addUserQuery, (error, result)=>{
		if (error)
			res.end(error);
		res.send("Information Added! ");
	})
}); 

// update user 
app.post('/updateUser', (req, res) => {
	var og_id = req.body.input_id; 
	var name = req.body.u_name;
	var size = req.body.u_size;
	var height = req.body.u_height;
	var type = req.body.u_type; 
	var id = req.body.u_id; 
	var query = 'UPDATE person SET name = \''; 
	var updateUserQuery = query.concat(name, '\', size = ', size, ', height = ', 
									   height, ', type = \'', type, '\', id = \'', 
									   id, '\' WHERE id = \'', og_id, '\'');
	pool.query(updateUserQuery, (error, result)=>{
		if (error)
			res.end(error);
		res.send("Update Succeeded!");
	}) 
});

app.post('/deleteUser', (req, res) => {
	var id = req.body.d_id; 
	var query = 'DELETE FROM person WHERE id = \''; 
	var deleteUserQuery = query.concat(id, '\'');
	pool.query(deleteUserQuery, (error, result)=>{
		if (error)
			res.end(error);
		res.send("Record Deleted!");
	}) 
});

// app.post('/drawDisplay', (req, res) => {
// 	var values = Object.values(size[0]);
// 	for (let i = 1; i < size.length; i++) {
// 		values.push(Object.values(size[i])[0]); 
// 	}
// 	res.send(values);
// });

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