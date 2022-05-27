const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

// require passport and pssport jwt
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');



app.use(express.urlencoded());

app.use('/', require('./routes'));

//server
app.listen(port, function(err) {
    if(err) {
        console.log("Error in returning the server", err);
    }

    console.log(`Yup!! Server is up and running on port : ${port}`);
})