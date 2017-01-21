var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

const url = 'mongodb://localhost:27017/myproject';

var app = express();
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("Running on port", port);
  });
});

app.post("/createUser", function(req, res){
	var newUser = req.body;
	console.log(newUser.username);
	db.collection("users", function(error, users){
		users.findOne({ username: newUser.username }, function(error, document){
			if (document == null){
				users.insertOne({ username: newUser.username, password: newUser.password});
				res.status(200);
			}else{
				res.status(500).json({"error": "username already exists"});
			}
		} );
	})
});

app.post("/login", function(req, res){
	var newUser = req.body;
	console.log(newUser.username);
	db.collection("users", function(error, users){
		users.findOne({ username: newUser.username, password: newUser.password }, function(error, document){
			if (document == null){
				res.status(500).json({"error": "username or password is invalid"});
			}else{
				res.status(500);
			}
		} );
	})
});

app.post("/schedule", function(req, res) {
	var appointment = req.body;
	db.collection("calendars", function(error, calendars) {
		console.log(appointment.userID);
		calendars.findOne({ _id: appointment.userID }, function(error, calendar) {
			var event = {
				time: appointment.time,
				name: appointment.name,
				desc: appointment.desc,
				location: appointment.location,
				priority: appointment.priority
			};
			if (calendar != null) {
				if (calendar.appointment.date != null) {

					calendar.appointment.date.push(event);
				} else {
					calendar.appointment.appointment.date = [event];
				}
			} else {
				var date = appointment.date;
				calendars.insertOne({ _id: appointment.userID, date: [event] })
			}
		});
	})
});