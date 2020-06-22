const express = require('express')
const path = require('path') /*pre-installed library*/
const PORT = process.env.PORT || 5000
// either production environment or local 5000

const { Pool } = require('pg'); 
var pool; 
pool = new Pool ({ // a constructor pool 
	// connectionString: 'postgres://postgres:root@localhost/persons' 
	//scheme://user:password@localhost/database
	connectionString: process.env.DATABASE_URL
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
name_copy = [];

// what to do if request is database 
app.get('/people', (req, res) => { // whenever user types into the app
	var viewPersonQuery = 'SELECT name FROM person ORDER BY name'; 
	var selectSizeQuery = 'SELECT size FROM person'; 
	var selectHeightQuery = 'SELECT height FROM person'; 
	var selectTypeQuery = 'SELECT type FROM person'; 
	var selectIdQuery = 'SELECT id FROM person'; 
	// var selectAllQuery = 'SELECT * FROM person'; 

	// Name List Display
	pool.query(viewPersonQuery, (error, result)=>{
		if (error)
			res.end(error); // send error object if there is error
		for (let i = 0; i < (result.rows).length; i++) {
			var trimmed = (Object.values(result.rows[i])[0]).trim(); 
			var row = {'name':trimmed}; 
			name.push(row); 
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
				var trimmed = (Object.values(result.rows[i])[0]).trim(); 
				var row = {'type':trimmed}; 
				type.push(row);  
			}
		})
		pool.query(selectIdQuery, (error, result)=>{
			if (error)
				res.end(error); // send error object if there is error
			for (let i = 0; i < (result.rows).length; i++) {
				var trimmed = (Object.values(result.rows[i])[0]).trim(); 
				var row = {'id':trimmed}; 
				id.push(row);   
			}
			name_copy = name;
			var temp1 = name.concat(size); 
			var temp2 = temp1.concat(height);
			var temp3 = temp2.concat(type); 
			var data = temp3.concat(id); 

			res.render('pages/db', data);
			size = []; 
			height = []; 
			type = []; 	
			name = [];
			id = [];
		})
		// pool.query(selectAllQuery, (error, result)=>{
		// 	if (error)
		// 		res.end(error);
		// 	var results = {'rows': result.rows};
		// 	res.render('pages/db', results);
		// })

	}); 
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
		if (error) {
			res.end(error);
		}
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

results = []; 
testing = []
app.post('/viewInfo', (req, res) => {
	for (let i = 0; i < name_copy.length; i++) {
		var name_val = (Object.values(name_copy[i])[0]);
		// reference: https://stackoverflow.com/questions/41918674/how-to-use-a-variable-in-req-body-nodejs
		var name = req.body[name_val];
		if (name == null) {
			continue;
		}
		var query = 'SELECT * FROM person WHERE name = \''; 
		var viewInfoQuery = query.concat(name, '\'');
		pool.query(viewInfoQuery, (error, result)=>{
			if (error)
				res.end(error);
			var name_trimmed = ((result.rows[0])['name']).trim(); 
			var type_trimmed = ((result.rows[0])['type']).trim();
			var id_trimmed = ((result.rows[0])['id']).trim();
			var size = (result.rows[0])['size']; 
			var height = (result.rows[0])['height'];
			results = [{'name':name_trimmed}, {'size':size}, {'height':height}, 
						{'type':type_trimmed}, {'id':id_trimmed}];
			res.send(results);		
		}) 
	}
	results = [];
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