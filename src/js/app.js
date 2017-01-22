var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

const url = 'mongodb://localhost:27017/myproject';

var app = express();
app.use(express.static(__dirname + "/../../public"));

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
				res.end();
			}else{
				res.status(500).json({"error": "username already exists"});
				res.end();
			}
		} );
	})
});

app.get("/", function(req, res){
	res.sendFile(path.resolve("../../index.html"));
});

app.post("/login", function(req, res){
	var newUser = req.body;
	console.log(newUser.username);
	db.collection("users", function(error, users){
		users.findOne({ username: newUser.username, password: newUser.password }, function(error, document){
			if (document == null){
				res.status(500).json({"error": "username or password is invalid"});
				res.end();
			}else{
				res.status(200);
				res.end();
			}
		} );
	})
});

app.post("/schedule", function(req, res) {
	var appointment = req.body;
	db.collection("calendars", function(error, calendars) {
		calendars.findOne({ _id: appointment.userID }, function(error, calendar) {
			var event = {
				startTime: appointment.startTime,
				endTime: appointment.endTime,
				duration: appointment.duration,
				name: appointment.name,
				desc: appointment.desc,
				location: appointment.location,
				priority: appointment.priority,
			};
			if (calendar != null) {
				if (calendar[appointment.date] != null) {
					var appts = calendar[appointment.date];
					var conflict = false;
					var apptStart = event.startTime.split(":");
					var apptEnd = event.endTime.split(":");
					apptStart = parseInt(apptStart[0] + apptStart[1]);
					apptEnd = parseInt(apptEnd[0] + apptEnd[1]);
					for (var i = 0; i < appts.length; i++) {
						var start = appts[i].startTime.split(":");
						var end = appts[i].endTime.split(":");
						start = parseInt(start[0] + start[1]);
						end = parseInt(end[0] + end[1]);
						if ((start < apptStart && apptStart < end) || (start < apptEnd && apptEnd < end)) {
							console.log(start, apptStart, end, start, apptEnd, end);
							conflict = true;
              res.status(500);
              res.end();
						}
					}
					if (conflict == false) {
						calendar[appointment.date].push(event);
						var updatedEvents = calendar[appointment.date];
						var cal = {};
						cal[appointment.date] = updatedEvents;
						calendars.update({ _id : appointment.userID }, {$set: cal });
            
            res.status(200);
            res.end();
					}
				} else {
					calendar[appointment.date] = [event];
          res.status(200);
          res.end();
				}
			} else {
				var calendar = { _id: appointment.userID };
				calendar[appointment.date] = [event];
				calendars.insertOne(calendar)
        		res.status(200);
        		res.end();
			}
		});
	})
});

app.get("/user", function(req, res) {
	var usernameQuery = req.query.username;
	console.log(usernameQuery);
	db.collection("users", function(error, users){
		users.findOne({ username: usernameQuery }, function(error, document){
			if (document == null){
				res.status(500).json({"error": "Username is invalid"});
				res.end();
			}else{
				res.status(200);
				res.end();
			}
		});
	});
})