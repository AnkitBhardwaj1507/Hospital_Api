//require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/hospital_api_db');

//acquire the connection
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, "Error connecting to MongoDb"));

//up and running
db.once('open', function() {
    console.log("Connected to Database :: MongoDB");
});

module.exports = db;