var express = require('express');
var app = express();
//To access "faker" package we installed that creates fake data
var faker = require('faker');
//To access mysql package
var mysql = require('mysql');
//To access bodyparser
var bodyParser = require("body-parser");
//Configure app to use embedded javascript
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'DEPENDS ON THE USER', //????
  database  : 'enlist'
});

//Connecting the data from the form in home.ejs
app.post('/register', function(req,res){
  var person = {email: req.body.email};
  connection.query('INSERT INTO users SET ?', person, function(err, result) {
  console.log(err);
  console.log(result);
  res.redirect("/");
  });
 });

//Tell the app what to do when someone requests the URL at "/"
app.get("/", function(req, res){
  // Find count of users in DB
  var q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function(err, results){
    if (err) throw err;
    var count = results[0].count;
    // Show home.ejs with count passed to it
    res.send("home", {count: count});
  });
});

//Start the server at specific # port
app.listen(3306, function(){
  console.log("Server running!");
});



//Generate 500 users into array of data
var data = [];
for(var i = 0; i < 500; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}

//Insert data (users) into table
var q = 'INSERT INTO users (email, created_at) VALUES ?';
 
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});
 
connection.end();